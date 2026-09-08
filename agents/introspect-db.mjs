#!/usr/bin/env node
// introspect-db.mjs - dump the LIVE schema: columns, constraints, indexes, enums,
// extensions, approximate row counts, plus warnings for missing PKs, unindexed FKs,
// and FKs with no explicit ON DELETE. Agents plan against the deployed database,
// not against ORM files that have drifted.
//
// Usage: node scripts/introspect-db.mjs --out .agent/<slug>/schema.sql [--url $DATABASE_URL]
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import postgres from "postgres";

function parse(argv) {
  const a = { out: null, url: process.env.DATABASE_URL };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--out") a.out = argv[++i];
    else if (argv[i] === "--url") a.url = argv[++i];
  }
  if (!a.out) { console.error("usage: introspect-db.mjs --out <path> [--url <dsn>]"); process.exit(2); }
  if (!a.url) { console.error("DATABASE_URL not set and --url not given"); process.exit(2); }
  return a;
}

const { out, url } = parse(process.argv);
const sql = postgres(url, { max: 1, onnotice: () => {} });

async function tables() {
  return sql`
    select t.table_schema, t.table_name
    from information_schema.tables t
    where t.table_schema not in ('pg_catalog','information_schema')
      and t.table_type = 'BASE TABLE'
    order by 1,2`;
}
async function columns(schema, name) {
  return sql`
    select column_name, data_type, udt_name, is_nullable, column_default,
           character_maximum_length, numeric_precision, numeric_scale
    from information_schema.columns
    where table_schema=${schema} and table_name=${name}
    order by ordinal_position`;
}
async function constraints(schema, name) {
  return sql`
    select con.conname, con.contype, con.convalidated,
           pg_get_constraintdef(con.oid) as def
    from pg_constraint con
    join pg_class rel on rel.oid = con.conrelid
    join pg_namespace n on n.oid = connamespace
    where n.nspname=${schema} and rel.relname=${name}
    order by con.contype, con.conname`;
}
async function indexes(schema, name) {
  return sql`
    select i.relname as index_name, am.amname as method,
           pg_get_indexdef(ix.indexrelid) as def, ix.indisunique, ix.indisprimary
    from pg_index ix
    join pg_class i on i.oid = ix.indexrelid
    join pg_class t on t.oid = ix.indrelid
    join pg_namespace n on n.oid = t.relnamespace
    join pg_am am on am.oid = i.relam
    where n.nspname=${schema} and t.relname=${name}
    order by ix.indisprimary desc, i.relname`;
}
async function enums() {
  return sql`
    select n.nspname, t.typname, e.enumlabel, e.enumsortorder
    from pg_type t
    join pg_namespace n on n.oid = t.typnamespace
    join pg_enum e on e.enumtypid = t.oid
    where n.nspname not in ('pg_catalog','information_schema')
    order by n.nspname, t.typname, e.enumsortorder`;
}
async function extensions() {
  return sql`select extname, extversion from pg_extension order by extname`;
}
async function rowCount(schema, name) {
  const r = await sql`select (reltuples)::bigint as approx from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname=${schema} and c.relname=${name}`;
  return r[0]?.approx ?? null;
}

const out2 = [];
const w = (s) => out2.push(s);
const warn = [];
try {
  const exts = await extensions();
  w(`-- schema introspection ${new Date().toISOString()}`);
  w(`-- database: ${url.replace(/:[^:@]+@/, ":***@")}`);
  w(`-- extensions:`);
  for (const e of exts) w(`--   ${e.extname} ${e.extversion}`);
  w("");
  const ens = await enums();
  if (ens.length) {
    w("-- enums");
    let cur = null;
    for (const e of ens) {
      const key = `${e.nspname}.${e.typname}`;
      if (key !== cur) { w(`-- type ${key}`); cur = key; }
      w(`--   ${e.enumlabel}`);
    }
    w("");
  }
  const ts = await tables();
  for (const t of ts) {
    const approx = await rowCount(t.table_schema, t.table_name);
    w(`-- ============================================================`);
    w(`-- table ${t.table_schema}.${t.table_name}  (approx rows: ${approx})`);
    w(`-- ============================================================`);
    const cols = await columns(t.table_schema, t.table_name);
    for (const c of cols) {
      w(`--   ${c.column_name} ${c.data_type}${c.udt_name && c.data_type === "USER-DEFINED" ? ` (${c.udt_name})` : ""}${c.is_nullable === "NO" ? " NOT NULL" : ""}${c.column_default ? ` DEFAULT ${c.column_default}` : ""}`);
    }
    const cons = await constraints(t.table_schema, t.table_name);
    const hasPK = cons.some((c) => c.contype === "p");
    if (!hasPK) warn.push(`${t.table_schema}.${t.table_name}: no primary key`);
    for (const c of cons) {
      const kind = { p: "PRIMARY KEY", f: "FOREIGN KEY", u: "UNIQUE", c: "CHECK" }[c.contype] || c.contype;
      w(`--   ${kind} ${c.conname}: ${c.def}`);
      if (c.contype === "f" && !/on delete/i.test(c.def)) warn.push(`${t.table_schema}.${t.table_name}: FK ${c.conname} has no explicit ON DELETE`);
    }
    const idx = await indexes(t.table_schema, t.table_name);
    const fkCols = cons.filter((c) => c.contype === "f").map((c) => {
      const m = c.def.match(/\(([^)]+)\)\s+REFERENCES/i);
      return m ? m[1].split(",").map((s) => s.trim()) : [];
    }).flat();
    for (const fcol of fkCols) {
      const covered = idx.some((i) => new RegExp(`\\(${fcol}\\b|\\b${fcol},|,\\s*${fcol}\\b`).test(i.def));
      if (!covered) warn.push(`${t.table_schema}.${t.table_name}: FK column ${fcol} has no index`);
    }
    for (const i of idx) {
      w(`--   INDEX ${i.index_name}${i.indisprimary ? " (pk)" : i.indisunique ? " (unique)" : ""} [${i.method}]: ${i.def}`);
    }
    w("");
  }
  if (warn.length) {
    w("-- ============================================================");
    w("-- WARNINGS");
    w("-- ============================================================");
    for (const x of warn) w(`--   ! ${x}`);
  }
  await mkdir(dirname(resolve(out)), { recursive: true });
  await writeFile(out, out2.join("\n") + "\n");
  console.log(`wrote ${out} (${out2.length} lines, ${warn.length} warnings)`);
} finally {
  await sql.end();
}
