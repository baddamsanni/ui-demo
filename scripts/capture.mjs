#!/usr/bin/env node
// capture.mjs - 2x screenshots (full page + viewport), DOM outline with per-node box
// geometry and computed styles, frequency-ranked token histogram, raw HTML, downloaded
// assets. The outline is what stops the planner eyeballing spacing.
//
// Usage:
//   node scripts/capture.mjs --check
//   node scripts/capture.mjs --url <url> --out <dir> --label <label> [--scroll] [--wait <ms>] [--viewport <WxH>]
import { mkdir, writeFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve, join } from "node:path";
import { chromium } from "playwright";
import sharp from "sharp";

function parse(argv) {
  const a = { check: false, scroll: false, wait: 2000, viewport: "1440x900" };
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i];
    if (k === "--check") a.check = true;
    else if (k === "--url") a.url = argv[++i];
    else if (k === "--out") a.out = argv[++i];
    else if (k === "--label") a.label = argv[++i];
    else if (k === "--scroll") a.scroll = true;
    else if (k === "--wait") a.wait = parseInt(argv[++i], 10);
    else if (k === "--viewport") a.viewport = argv[++i];
  }
  if (a.check) return a;
  if (!a.url || !a.out || !a.label) {
    console.error("usage: capture.mjs --url <url> --out <dir> --label <label> [--scroll] [--wait ms] [--viewport WxH]");
    process.exit(2);
  }
  return a;
}

async function checkEnv() {
  const missing = [];
  for (const m of ["playwright", "sharp"]) {
    try { await import(m); } catch { missing.push(m); }
  }
  if (missing.length) {
    console.error(`missing deps: ${missing.join(", ")}`);
    console.error("install: pnpm add -D playwright sharp pngjs pixelmatch && npx playwright install chromium");
    process.exit(1);
  }
  console.log("ok: playwright + sharp present");
}

const RGB_RE = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
const RGBA_RE = /rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/;
function toHex(color) {
  if (!color) return null;
  let m = RGB_RE.exec(color);
  if (m) return "#" + [m[1], m[2], m[3]].map((n) => (+n).toString(16).padStart(2, "0")).join("");
  m = RGBA_RE.exec(color);
  if (m) return "#" + [m[1], m[2], m[3]].map((n) => (+n).toString(16).padStart(2, "0")).join("");
  if (color.startsWith("#")) return color.length === 7 ? color : null;
  return color;
}

async function buildOutline(page) {
  return page.evaluate(() => {
    const nodes = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
    let el;
    while ((el = walker.nextNode())) {
      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) continue;
      const cs = getComputedStyle(el);
      const tag = el.tagName.toLowerCase();
      const id = el.id ? `#${el.id}` : "";
      const cls = el.className && typeof el.className === "string"
        ? "." + el.className.trim().split(/\s+/).slice(0, 3).join(".")
        : "";
      nodes.push({
        sel: `${tag}${id}${cls}`,
        x: Math.round(r.x), y: Math.round(r.y),
        w: Math.round(r.width), h: Math.round(r.height),
        font: cs.fontFamily.split(",")[0].replace(/"/g, ""),
        size: cs.fontSize, weight: cs.fontWeight,
        lh: cs.lineHeight, ls: cs.letterSpacing,
        color: cs.color, bg: cs.backgroundColor,
        radius: cs.borderRadius, pad: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`,
        border: `${cs.borderWidth} ${cs.borderStyle} ${cs.borderColor}`,
      });
    }
    return nodes;
  });
}

function tokenize(nodes) {
  const hist = (m) => {
    const c = {};
    for (const n of nodes) { const v = m(n); if (v && v !== "0px" && v !== "none" && v !== "rgba(0, 0, 0, 0)") c[v] = (c[v] || 0) + 1; }
    return Object.entries(c).sort((a, b) => b[1] - a[1]).slice(0, 40);
  };
  return {
    colors: hist((n) => toHex(n.color)),
    backgrounds: hist((n) => toHex(n.bg)),
    fontSizes: hist((n) => n.size),
    fontFamilies: hist((n) => n.font),
    fontWeights: hist((n) => n.weight),
    radii: hist((n) => n.radius),
  };
}

function outlineText(nodes) {
  return nodes.map((n) =>
    `${n.sel}  box(${n.x},${n.y} ${n.w}x${n.h})  font=${n.font}/${n.size}/${n.weight} lh=${n.lh} ls=${n.ls}  color=${toHex(n.color) || n.color} bg=${toHex(n.bg) || n.bg}  r=${n.radius} pad=${n.pad} border=${n.border}`
  ).join("\n");
}

async function downloadAssets(page, outDir) {
  const assetDir = join(outDir, "assets");
  await mkdir(assetDir, { recursive: true });
  const urls = await page.evaluate(() =>
    Array.from(document.querySelectorAll("img[src],source[srcset],link[rel=stylesheet][href]"))
      .map((e) => e.src || e.href || (e.srcset || "").split(" ")[0])
      .filter(Boolean)
  );
  const uniq = [...new Set(urls)].slice(0, 80);
  let n = 0;
  for (const u of uniq) {
    try {
      const url = new URL(u, page.url()).href;
      const buf = await page.evaluate(async (url) => {
        const r = await fetch(url); return new Uint8Array(await r.arrayBuffer());
      }, url);
      const name = (new URL(url).pathname.replace(/[^\w.-]/g, "_").slice(-60) || `asset_${n}`) || `asset_${n}`;
      await writeFile(join(assetDir, name), buf);
      n++;
    } catch { /* ignore individual asset failures */ }
  }
  return n;
}

const args = parse(process.argv);
if (args.check) { await checkEnv(); process.exit(0); }

const [W, H] = args.viewport.split("x").map(Number);
const outDir = resolve(args.out);
if (existsSync(outDir)) await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto(args.url, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(args.wait);

if (args.scroll) {
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += H) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(250);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
}

const fullPng = await page.screenshot({ fullPage: true, type: "png" });
const vpPng = await page.screenshot({ type: "png" });
await writeFile(join(outDir, `${args.label}-full.png`), fullPng);
await writeFile(join(outDir, `${args.label}-viewport.png`), vpPng);

const nodes = await buildOutline(page);
await writeFile(join(outDir, "dom-outline.txt"), outlineText(nodes));
await writeFile(join(outDir, "tokens.json"), JSON.stringify(tokenize(nodes), null, 2));
const html = await page.content();
await writeFile(join(outDir, "raw.html"), html);
const assetCount = await downloadAssets(page, outDir);

// downscale 2x -> 1x reference thumbnails for quick viewing
await sharp(fullPng).resize({ width: W }).png().toFile(join(outDir, `${args.label}-full@1x.png`));

await browser.close();
console.log(`captured ${args.label}: ${nodes.length} nodes, ${html.length} html bytes, ${assetCount} assets -> ${outDir}`);
