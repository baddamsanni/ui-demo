---
description: "Reskin kickoff: clone utility.agency's visual system onto sdhsystems.com (an IT staffing company). Layout/spacing/type/color only - never logo, fonts, photos, or copy. All SDH content preserved. Five phases with hard gates. slug=sdh-refresh."
model: inherit
---

# sdh-refresh - clone utility.agency's visual system onto sdhsystems.com

TARGET DESIGN (visual system only): https://utility.agency/
CONTENT SOURCE (every page, heading, service, CTA - verbatim): http://sdhsystems.com/
SLUG: `sdh-refresh`

This is a **reskin, not a rewrite.** Content comes from SDH Systems (an IT staffing company).
Only the visual system - layout, spacing, type scale, color system, motion - comes from utility.agency.

Follow the phases in order. Do not skip. Do not collapse. Each phase ends by writing its
artifact to `.agent/sdh-refresh/` before the next begins. Report at the end of every phase.

## Hard constraints (apply in every phase)
- Do NOT lift utility.agency's logo, wordmark, licensed fonts, photography, or copy.
  Layout, spacing, type scale, and color system only. Substitute SDH's own assets and text.
- All SDH content is preserved verbatim: every page, section heading, service description,
  expertise list, vision/mission/values/objectives, careers listings, contact details.
- The implementer must never read a `.png`. From Phase 4 on, `spec/visual-spec.md` is the
  only visual truth. Reaching for the design = a spec hole -> back to Phase 2.

---

## Phase 1 - CONTEXT
Run, do not skip:
```
node scripts/capture.mjs --check
node scripts/capture.mjs --url https://utility.agency/ --out .agent/sdh-refresh --label target --scroll --wait 4000
node scripts/capture.mjs --url http://sdhsystems.com/  --out .agent/sdh-refresh --label source --scroll --wait 4000
```
Confirm these exist and are non-empty: `target-full.png`, `target-viewport.png`,
`dom-outline.txt`, `tokens.json`, `raw.html`, `assets/`. If `dom-outline.txt` has under 20
nodes, retry with `--wait 8000` before continuing.

Write `.agent/sdh-refresh/context.md` containing:
1. Repo stack + layout (from `stack.mdc` / actual repo).
2. **Content inventory transcribed verbatim from sdhsystems.com** - every page, section
   heading, service description, expertise item, vision/mission/values/objectives text,
   careers postings, and CTA. This is the source of truth for content; later phases copy
   from here, not from memory.
3. Note which SDH assets (logo, contact info: 14 Inverness Dr E, H-220, Englewood, CO
   80112 / info@sdhsystems.com / 812-963-4SDH) must be substituted for utility.agency's.

**Report Phase 1**: list the captured artifacts with byte sizes + node count, and the
content inventory section list.

---

## Phase 2 - PLAN (open the screenshots)
Open `target-full.png` in the browser tool and actually look at it. Read `dom-outline.txt`
for measured geometry - trust it over your eye for spacing. Read `tokens.json` for the
frequency-ranked type/color/spacing histogram.

Write `.agent/sdh-refresh/spec/visual-spec.md` to the section list in `agents/planner.md`
(§1 viewport/grid, §2 color, §3 type scale, §4 spacing, §5 components+states, §6 section
sequence, §7 motion, §8 asset list). **Numbers, never adjectives.** Banned words:
modern, clean, minimal, sleek, elegant, nice, beautiful, simple, responsive. Every value
measured with a unit. Every component state (default/hover/focus/empty/loading/error) has
exact property deltas.

Also write `.agent/sdh-refresh/spec/plan.md`:
1. File list - every file to create/modify with its purpose.
2. Build order.
3. Risks (e.g. SDH's content volume vs. utility.agency's section shapes; substituting
   fonts without licensing; preserving all 6 services + expertise list + careers).
4. Asset substitution plan - which SDH assets replace which utility.agency placeholders.

Map SDH content onto the utility.agency section shapes here, in the spec - e.g.
utility.agency's "Innovating With Enterprises" / "Empowering New Ventures" case-study
grids become SDH's services + expertise grids; the hero rotating word list
(Tech Ventures / Digital Products / ...) becomes SDH-appropriate terms
(Staffing / IT Services / ...) drawn from SDH's own copy.

**Report Phase 2**: confirm visual-spec.md has all 8 sections with measured values, and
summarize the SDH-content-to-utility-section mapping.

---

## Phase 3 - VERIFY (gate)
Reopen the screenshot beside the spec. Sweep region by region: could you rebuild this
blind, from the spec alone, and land within a few pixels? Check every color in the image
has a `#rrggbb` token; every text style has family/weight/size/line-height/letter-spacing;
every component has all named states; the section sequence heights/rhythm match
`dom-outline.txt` within 2px.

Write `.agent/sdh-refresh/audit-1.md` per `agents/plan-verifier.md`:
```
APPROVED: yes | no
SCORE: 0.00 - 1.00
GAPS:   - <region/section>: <missing, as a concrete fix>
FIXES:  - <exact edit to spec/...>
ROUND: 1
```
**Below 0.90, or any layout/type gap: return to Phase 2 and patch the spec. NO CODE UNTIL
THIS CLEARS.** Max 3 rounds. On the 3rd failure, stop and ask.

**Report Phase 3**: the SCORE and APPROVED state. If not approved, list the FIXES sent back.

---

## Phase 4 - IMPLEMENT (close the screenshots)
Close every image. From here `spec/visual-spec.md` is your only visual truth. If you reach
for the design, the spec has a hole: log it under SPEC GAPS in `spec/plan.md` and go back
to Phase 2 rather than guessing.

Build complete files, no TODOs. Every state the spec names (hover/focus/empty/loading/error)
is implemented. All SDH content from `context.md` is present verbatim - every page, service,
expertise item, vision/mission/values/objectives, careers postings, contact details.

Then: typecheck, lint, build, boot the dev server. Paste real output.

**Report Phase 4**: file list created/modified, dev server URL + port, and verification
command outputs (typecheck/lint/build).

---

## Phase 5 - REVIEW (open the screenshots again)
```
node scripts/capture.mjs --url http://localhost:<port> --out .agent/sdh-refresh --label build-iter-1
node scripts/diff.mjs   .agent/sdh-refresh/target-full.png .agent/sdh-refresh/build-iter-1-full.png
```
Open both PNGs. Write `.agent/sdh-refresh/review-iter-1.md` as **property deltas with
current -> required values, ranked by visual impact.** Never impressions. Also verify
content completeness: every SDH section from `context.md` is present and verbatim.

Routing:
- implementation bug (code doesn't match spec) -> Phase 4.
- spec defect (code matches spec but not the screenshot) -> Phase 2 -> 3 -> 4.
Stop at SCORE >= 0.90 with no MISSING regions, or after 3 rounds.

**Report Phase 5**: final SCORE, residual deltas, content-completeness check, and the
stop/continue decision.

---

## Done definition
- Visual system matches utility.agency within the diff threshold (SCORE >= 0.90, no MISSING).
- Zero utility.agency logo/wordmark/licensed-font/photo/copy present - only SDH's own.
- Every SDH content item from `context.md` is on the site verbatim.
- Typecheck, lint, build, dev server all green.
