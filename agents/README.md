# Full-stack agent pack (Cursor + Devin)

Seven roles, two models, one artifact bus. Frontend, API, and Postgres - not just UI.

```
context-loader (glm-5.2)
   -> planner (swe-1.7, VISION)
      -> plan-verifier (swe-1.7, VISION)        [GATE - no code, no migration until this clears]
         -> db-migrator (glm-5.2)
            -> implementer (glm-5.2, NO VISION)
               -> behavior-reviewer (glm-5.2)   tests, contract, authz, query plans
               -> visual-reviewer (swe-1.7, VISION)  when UI is in scope
                  ^----- fixes / schema defects / spec defects -----+
```

## The idea
glm-5.2 cannot see, so the pipeline never asks it to. The planner serializes the screenshot into
numbers, and `plan-verifier` proves that serialization is complete **before** a line of code exists.

The same trick generalizes past UI. On the backend the blind spot is not pixels, it is intent -
authorization rules, invariants, error cases, the query that index was meant to serve. So the
planner writes `spec/contract.md` and `spec/data-model.md` the same way it writes `visual-spec.md`:
predicates and constraints, not prose. `packages/contract` is to the API what `visual-spec.md` is
to the UI - the artifact both the blind implementer and the reviewer bind to, so drift shows up as
a typecheck failure rather than a production surprise.

## Stack (`.cursor/rules/stack.mdc`, alwaysApply)
Next.js App Router + Tailwind + shadcn · Hono + `@hono/zod-openapi` · Drizzle + drizzle-kit ·
Postgres 17 · Better Auth · Vitest + Testcontainers + Playwright · pnpm + Turborepo.

**Postgres is the only datastore.** Everything that would normally add infrastructure uses a
Postgres feature instead: **pg-boss** for the job queue (retries, scheduling, dead-letter, no Redis),
`LISTEN/NOTIFY` -> SSE for realtime, unlogged tables for cache and rate limiting, `tsvector` + GIN
for search, `pgvector` for embeddings. One thing to operate, one thing to back up, one transaction
boundary around your jobs and your data.

Drizzle over Prisma specifically for this pipeline: migrations are plain reviewable `.sql` files and
the schema is TypeScript, so an agent can diff and reason about both. (Prisma 7 dropped the Rust
engine and closed most of the runtime gap - it is a fine ORM, just a worse fit for agents that need
to read the migration they are about to run.)

## Install (Cursor)
Copy `.cursor/` and `scripts/` to the repo root:
```
pnpm add -D playwright pngjs pixelmatch sharp postgres
npx playwright install chromium
```
Subagents load from `.cursor/agents/`; the main agent delegates using each file's `description`.
`stack.mdc` always applies. Attach the pipeline explicitly for a feature:
```
@pipeline add team invitations: POST /orgs/:id/invites, accept flow, match the design at <url>. slug=invites
```

## Model routing
`model:` in frontmatter is honored unless your org blocks the model or your plan lacks access - in
which case it silently falls back to the main agent's model, which would hand a screenshot to a
blind model or vice versa. Verify on the first run: `implementer` should never emit a read of a
`.png`. If `swe-1.7` / `glm-5.2` are not exposed as IDs in your org, put the vision agents on
`model: inherit` (run the main thread on the vision model) and the implementer on `model: fast`, or
drive the whole thing through the Cursor SDK where you set `model.id` per agent explicitly.

## Scripts
- `introspect-db.mjs` - dumps the **live** schema: columns, constraints, indexes, enums, extensions,
  approximate row counts, plus warnings for missing PKs, unindexed FKs, and FKs with no explicit
  `ON DELETE`. Agents plan against the deployed database, not against ORM files that have drifted.
- `capture.mjs` - 2x screenshots, DOM outline with per-node box geometry and computed styles,
  frequency-ranked token histogram, raw HTML, downloaded assets. The outline is what stops the
  planner eyeballing spacing.
- `diff.mjs` - block SSIM, pixel mismatch %, page-height delta, heatmap PNG. A prior, never the verdict.

## Devin
`devin/playbook-fullstack.md` - the same seven roles as seven phases with hard gates, since Devin
runs a single session. Phase 5 requires self-imposed blindness.

## Assets
Scraped logos, fonts, and photography are reference only. Substitute project assets before shipping.
Respect robots.txt and terms of service when scraping.
