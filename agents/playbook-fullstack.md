# Devin playbook: ship a feature (Next.js / Hono / Drizzle / Postgres)

Devin runs one session, so the seven roles become seven **phases** with hard gates.
Do not collapse phases. Nothing carries forward except the written artifact.

## Setup
```
node scripts/capture.mjs --check          # only if a design is in scope
mkdir -p .agent/<slug>/spec
```

## Phase 1 - CONTEXT
```
node scripts/introspect-db.mjs --out .agent/<slug>/schema.sql
node scripts/capture.mjs --url <TARGET> --out .agent/<slug> --label target   # if UI in scope
```
Read the live schema, not the Drizzle files - they drift. Write `.agent/<slug>/context.md`: stack, layout, relevant tables with row counts, existing endpoints and their authz, reusable code, current tests, conventions actually in use, warnings.

## Phase 2 - PLAN (vision on)
Write `spec/data-model.md`, `spec/contract.md`, `spec/plan.md`, and `spec/visual-spec.md` if UI is in scope, to the section lists in `.cursor/agents/planner.md`.
Rule: numbers, never adjectives. Constraints, never prose invariants. Authz as predicates over the data model.

## Phase 3 - VERIFY (gate)
Audit the spec against `schema.sql`, `openapi.json`, and the screenshot. Write `audit-1.md`.
**Below 0.90, or any data-model gap: back to Phase 2. No code, no migration until this clears.** Max 3 rounds.

## Phase 4 - MIGRATE
Edit `packages/db/schema`, `pnpm drizzle-kit generate`, **read the generated SQL**, apply to a scratch database, re-introspect to confirm it matches the spec. Expand/contract for anything destructive - contract steps ship in a later migration, never with the code change. State lock impact and backfill cost against real row counts.

## Phase 5 - IMPLEMENT (vision OFF - self-imposed)
Close the screenshot. `spec/` is the only visual and contract truth from here. If you reach for the design, the spec has a hole: log it and return to Phase 2.
Order: contract package -> db queries -> Hono handlers (authz predicate first) -> Next.js UI with every named state -> tests against a Testcontainers Postgres, including denial paths and each error case. Never mock the database.

## Phase 6 - REVIEW BEHAVIOR
Run typecheck, lint, vitest, playwright - paste real output. Diff the regenerated OpenAPI against the spec. Check the authz predicate on every endpoint touched. `EXPLAIN (ANALYZE, BUFFERS)` every new query against seeded data. Verify transaction boundaries and migration safety. Write `review-iter-<N>.md`.
No pass with a missing authz check, a failing test, or undeclared contract drift.

## Phase 7 - REVIEW VISUALS (vision on, if UI in scope)
```
node scripts/capture.mjs --url http://localhost:<port> --out .agent/<slug> --label build-iter-<N>
node scripts/diff.mjs .agent/<slug>/target-full.png .agent/<slug>/build-iter-<N>-full.png
```
Open both. Write property deltas with current -> required values, ranked by impact. Never impressions.

## Routing on failure
implementation bug -> Phase 5 · schema defect -> Phase 4 · spec defect -> Phase 2 -> 3 -> 5.
Max 3 rounds. Report final scores and residual deltas.

## Devin Knowledge entries to add
- The artifact bus layout under `.agent/<slug>/`, so a resumed session picks up where it left off.
- `DATABASE_URL` for the scratch database, dev server command and port.
- Expand/contract is mandatory; no destructive migration ships with its code change.
- Scraped logos, fonts, and photography are reference only - substitute project assets before shipping.
