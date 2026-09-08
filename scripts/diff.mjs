#!/usr/bin/env node
// diff.mjs - block SSIM, pixel mismatch %, page-height delta, heatmap PNG.
// A prior, never the verdict. The verdict is the reviewer opening both PNGs.
//
// Usage: node scripts/diff.mjs <baseline.png> <candidate.png> [--block 32] [--out <dir>]
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, basename, resolve, join } from "node:path";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import sharp from "sharp";

function parse(argv) {
  const a = { block: 32, out: null };
  const pos = [];
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--block") a.block = parseInt(argv[++i], 10);
    else if (argv[i] === "--out") a.out = argv[++i];
    else pos.push(argv[i]);
  }
  if (pos.length < 2) { console.error("usage: diff.mjs <baseline.png> <candidate.png> [--block N] [--out dir]"); process.exit(2); }
  a.base = pos[0]; a.cand = pos[1];
  return a;
}

async function loadPNG(file) {
  const buf = await readFile(file);
  return PNG.sync.read(buf);
}

function ssimBlock(a, b, x, y, w, h, W) {
  // single-scale SSIM over a block using luminance (Rec. 601)
  const n = w * h;
  let sa = 0, sb = 0, saa = 0, sbb = 0, sab = 0;
  for (let j = 0; j < h; j++) {
    for (let i = 0; i < w; i++) {
      const idx = ((y + j) * W + (x + i)) << 2;
      const la = 0.299 * a.data[idx] + 0.587 * a.data[idx + 1] + 0.114 * a.data[idx + 2];
      const lb = 0.299 * b.data[idx] + 0.587 * b.data[idx + 1] + 0.114 * b.data[idx + 2];
      sa += la; sb += lb; saa += la * la; sbb += lb * lb; sab += la * lb;
    }
  }
  const ma = sa / n, mb = sb / n;
  const va = saa / n - ma * ma, vb = sbb / n - mb * mb;
  const cov = sab / n - ma * mb;
  const c1 = (0.01 * 255) ** 2, c2 = (0.03 * 255) ** 2;
  return ((2 * ma * mb + c1) * (2 * cov + c2)) / ((ma * ma + mb * mb + c1) * (va + vb + c2));
}

const args = parse(process.argv);
const base = await loadPNG(args.base);
let cand = await loadPNG(args.cand);

// normalize dimensions: pad the shorter to the taller/wider on a neutral canvas
const W = Math.max(base.width, cand.width);
const H = Math.max(base.height, cand.height);
function canvas(src, W, H) {
  if (src.width === W && src.height === H) return src;
  const out = new PNG({ width: W, height: H });
  out.data.fill(255);
  PNG.bitblt(src, out, 0, 0, src.width, src.height, 0, 0);
  return out;
}
const a = canvas(base, W, H);
const b = canvas(cand, W, H);

const diff = new PNG({ width: W, height: H });
const mismatched = pixelmatch(a.data, b.data, diff.data, W, H, { threshold: 0.1, alpha: 0.3 });
const total = W * H;
const mismatchPct = (mismatched / total) * 100;

// block SSIM
const blocks = [];
let ssimSum = 0, blockCount = 0;
for (let y = 0; y < H; y += args.block) {
  for (let x = 0; x < W; x += args.block) {
    const w = Math.min(args.block, W - x);
    const h = Math.min(args.block, H - y);
    const s = ssimBlock(a, b, x, y, w, h, W);
    blocks.push({ x, y, w, h, ssim: s });
    ssimSum += s; blockCount++;
  }
}
blocks.sort((p, q) => p.ssim - q.ssim);
const meanSSIM = ssimSum / blockCount;
const score = Math.max(0, Math.min(1, meanSSIM)); // prior only

const outDir = args.out ? resolve(args.out) : dirname(resolve(args.cand));
await mkdir(outDir, { recursive: true });
const heatName = `diff-${basename(args.cand).replace(/\.png$/, "")}.png`;
await writeFile(join(outDir, heatName), PNG.sync.write(diff));
// also a downscaled heatmap for quick viewing
await sharp(PNG.sync.write(diff)).resize({ width: 1440 }).png().toFile(join(outDir, `diff-${basename(args.cand).replace(/\.png$/, "")}@1x.png`));

const heightDelta = base.height - cand.height;
console.log(JSON.stringify({
  baseline: args.base, candidate: args.cand,
  width: W, height: H,
  baselineHeight: base.height, candidateHeight: cand.height, heightDelta,
  mismatchedPixels: mismatched, mismatchPct: +mismatchPct.toFixed(2),
  meanSSIM: +meanSSIM.toFixed(4), scorePrior: +score.toFixed(4),
  block: args.block, blockCount,
  worstBlocks: blocks.slice(0, 10).map((bk) => ({ x: bk.x, y: bk.y, ssim: +bk.ssim.toFixed(3) })),
  heatmap: join(outDir, heatName),
}, null, 2));
