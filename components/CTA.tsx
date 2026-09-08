"use client";

import { useReveal } from "./useReveal";

export default function CTA() {
  const ref = useReveal();

  return (
    <section id="contact" className="section-line noise relative overflow-hidden px-6 py-32 lg:px-8">
      {/* Multi-layer glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.08] blur-[180px]"
          style={{ background: "radial-gradient(ellipse, #4ade80, transparent 70%)" }}
        />
        <div
          className="absolute left-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full opacity-[0.05] blur-[140px]"
          style={{ background: "radial-gradient(circle, #22d3ee, transparent 70%)" }}
        />
        <div
          className="absolute right-1/4 top-1/2 h-[400px] w-[500px] -translate-y-1/2 rounded-full opacity-[0.04] blur-[120px]"
          style={{ background: "radial-gradient(circle, #a78bfa, transparent 70%)" }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div ref={ref} className="reveal relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="text-tiny font-medium uppercase tracking-[0.2em] text-steel-2">
            Available for new projects
          </span>
        </div>

        <h2 className="text-hero-l font-medium leading-[1.05] text-canvas lg:text-hero-xl">
          Let's build{" "}
          <span className="gradient-text">something</span>
          <br />
          <span className="font-display italic text-steel-2">that ships.</span>
        </h2>

        <p className="mx-auto mt-8 max-w-xl text-body text-steel-2 leading-relaxed">
          Tell us about your project. We'll come back with a team, a timeline,
          and a plan within 48 hours.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="mailto:info@sdhsystems.com"
            className="btn-wrapper group inline-flex items-center gap-2 rounded-full bg-canvas px-8 py-4 text-body-s font-semibold text-jet transition-all hover:shadow-[0_0_50px_rgba(247,248,248,0.3)]"
          >
            Start a project
            <span className="btn-arrow">↗</span>
          </a>
          <a
            href="tel:8129634734"
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] px-8 py-4 text-body-s font-medium text-canvas transition-all hover:border-white/[0.25] hover:bg-white/[0.02]"
          >
            Call 812-963-4SDH
          </a>
        </div>
      </div>
    </section>
  );
}
