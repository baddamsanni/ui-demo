"use client";

import { useEffect, useRef } from "react";

// Animated box grid — half green, half purple boxes that pulse and shift.
// Canvas-based for smooth 60fps, respects reduced-motion.

type Box = {
  col: number;
  row: number;
  baseOpacity: number;
  phase: number;
  pulseSpeed: number;
  isGreen: boolean;
};

export default function FloatingElements() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const BOX_SIZE = 44;
    const GAP = 8;
    const CELL = BOX_SIZE + GAP;

    let boxes: Box[] = [];
    let cols = 0;
    let rows = 0;

    const initBoxes = () => {
      cols = Math.ceil(width / CELL) + 1;
      rows = Math.ceil(height / CELL) + 1;
      boxes = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Half black, half white — checkerboard
          const isGreen = (c + r) % 2 === 0;
          boxes.push({
            col: c,
            row: r,
            baseOpacity: 0.02 + Math.random() * 0.06,
            phase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.008 + Math.random() * 0.015,
            isGreen,
          });
        }
      }
    };

    initBoxes();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      initBoxes();
    };
    window.addEventListener("resize", handleResize);

    let rafId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      for (const b of boxes) {
        b.phase += b.pulseSpeed;

        // Pulsing opacity with wave effect across grid
        const waveX = Math.sin(b.col * 0.3 + time * 0.8) * 0.5 + 0.5;
        const waveY = Math.cos(b.row * 0.3 + time * 0.6) * 0.5 + 0.5;
        const wave = (waveX + waveY) / 2;

        const opacity = b.baseOpacity + wave * 0.12 + Math.sin(b.phase) * 0.02;
        const clampedOpacity = Math.max(0, Math.min(0.25, opacity));

        if (clampedOpacity < 0.005) continue;

        const x = b.col * CELL;
        const y = b.row * CELL;

        // Scale animation — boxes grow/shrink slightly
        const scale = 0.7 + wave * 0.3;
        const drawSize = BOX_SIZE * scale;
        const offset = (BOX_SIZE - drawSize) / 2;

        const color = b.isGreen ? "255, 255, 255" : "60, 60, 65";

        // Box fill
        ctx.fillStyle = `rgba(${color}, ${clampedOpacity * 0.3})`;
        ctx.strokeStyle = `rgba(${color}, ${clampedOpacity})`;
        ctx.lineWidth = 1;

        const r = 6;
        roundRect(ctx, x + offset, y + offset, drawSize, drawSize, r);
        ctx.fill();
        ctx.stroke();

        // Inner dot for brighter boxes
        if (clampedOpacity > 0.08) {
          ctx.fillStyle = `rgba(${color}, ${clampedOpacity * 0.6})`;
          ctx.beginPath();
          ctx.arc(x + BOX_SIZE / 2, y + BOX_SIZE / 2, 1.5 * scale, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
