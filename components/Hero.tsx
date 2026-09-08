"use client";

import { useState, useEffect } from "react";
import FloatingElements from "./FloatingElements";
import { useReveal } from "./useReveal";

const cards = [
  {
    num: "01",
    title: "We build software.",
    desc: "Web apps, mobile apps, AI agents, and platforms — from idea to production.",
  },
  {
    num: "02",
    title: "We staff engineers.",
    desc: "300+ people placed into state, IT, and Workday projects — contract, SOW, or direct hire.",
  },
  {
    num: "03",
    title: "We ship SOW projects.",
    desc: "Fixed scope, fixed timeline, fixed budget. We own delivery end to end.",
  },
  {
    num: "04",
    title: "We enable AI.",
    desc: "We tune AI into existing systems — chatbots, automation, RAG, and agents that work.",
  },
];

function RotatingCards() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % cards.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative overflow-hidden rounded-2xl border p-8"
      style={{ borderColor: "var(--line-2)", minHeight: 280, background: "var(--jet-2)" }}
    >
      {/* Accent glow */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full opacity-[0.06] blur-[60px]"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
      />

      <div className="relative z-10">
        <p
          className="mb-6 text-tiny font-medium uppercase tracking-[0.3em]"
          style={{ color: "var(--accent)" }}
        >
          What we build
        </p>

        {/* Rotating card area */}
        <div className="relative" style={{ minHeight: 160 }}>
          {cards.map((card, i) => {
            const isActive = i === active;
            return (
              <div
                key={i}
                className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive
                    ? "translateY(0px) scale(1)"
                    : "translateY(20px) scale(0.96)",
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                <div className="flex gap-4">
                  <span
                    className="font-display text-5xl leading-none"
                    style={{ color: "var(--accent)" }}
                  >
                    {card.num}
                  </span>
                  <div className="flex-1 pt-1">
                    <p
                      className="font-display text-2xl italic leading-tight"
                      style={{ color: "var(--canvas)" }}
                    >
                      {card.title}
                    </p>
                    <p
                      className="mt-3 text-[14px] leading-relaxed"
                      style={{ color: "var(--steel-2)" }}
                    >
                      {card.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots indicator */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-2">
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === active ? 24 : 6,
                  backgroundColor: i === active ? "var(--accent)" : "var(--line-2)",
                }}
                aria-label={`Card ${i + 1}`}
              />
            ))}
          </div>
          <a
            href="#services"
            className="inline-flex items-center gap-1.5 text-small font-medium transition-all hover:gap-2.5"
            style={{ color: "var(--accent)" }}
          >
            See our services
            <span>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

const rotatingWords = [
  "Talent",
  "Platforms",
  "AI Systems",
  "Workday",
  "Delivery",
];

export default function Hero() {
  const [activeWord, setActiveWord] = useState(0);
  const revealRef = useReveal();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % rotatingWords.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="noise relative min-h-screen px-6 pt-32 pb-20 lg:px-8 overflow-hidden"
    >
      {/* ── Ambient background ── */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.06] blur-[160px]"
          style={{ background: "radial-gradient(ellipse, #4ade80, transparent 70%)" }}
        />
        <div
          className="absolute left-[10%] top-1/3 h-[400px] w-[400px] rounded-full opacity-[0.04] blur-[140px]"
          style={{ background: "radial-gradient(circle, #22d3ee, transparent 70%)" }}
        />
        <div
          className="absolute right-[5%] top-1/2 h-[350px] w-[500px] rounded-full opacity-[0.03] blur-[120px]"
          style={{ background: "radial-gradient(circle, #a78bfa, transparent 70%)" }}
        />
      </div>

      {/* ── Floating work elements (animated canvas) ── */}
      <FloatingElements />

      {/* ── Grid overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div
        ref={revealRef}
        className="reveal reveal-stagger relative z-10 mx-auto flex max-w-content flex-col gap-12 lg:flex-row lg:items-start lg:justify-between"
      >
        {/* Left: editorial copy */}
        <div className="max-w-2xl pt-4 lg:pt-12">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-tiny font-medium uppercase tracking-[0.2em] text-steel-2">
              Staffing & Technology Services
            </span>
          </div>

          <h1 className="text-hero-l font-medium leading-[1.02] text-canvas lg:text-hero-xl">
            <span className="block">We engineer</span>
            <span className="relative mt-1 block h-[1.1em] overflow-hidden">
              {rotatingWords.map((word, i) => (
                <span
                  key={word}
                  className={`hero-word absolute left-0 gradient-text ${
                    i === activeWord ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ transition: "opacity 0.6s cubic-bezier(0.4,0,0.2,1)" }}
                >
                  {word}
                </span>
              ))}
              <span className="invisible">{rotatingWords[0]}</span>
            </span>
            <span className="block font-display text-[0.7em] italic text-steel-2">
              that ships.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-body text-steel-2 leading-relaxed">
            SDH Systems is a 300-person delivery team across India and the USA.
            We build software, deploy AI agents, staff enterprise programs, and
            ship SOW projects for state, private-sector, and Workday clients.
          </p>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
            <a
              href="#contact"
              className="btn-wrapper group inline-flex items-center gap-2 rounded-full bg-canvas px-7 py-3.5 text-body-s font-semibold text-jet transition-all hover:shadow-[0_0_40px_rgba(247,248,248,0.25)]"
            >
              Start a project
              <span className="btn-arrow">↗</span>
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] px-7 py-3.5 text-body-s font-medium text-canvas transition-all hover:border-white/[0.25] hover:bg-white/[0.02]"
            >
              Explore services
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex items-center gap-8">
            <div>
              <div className="text-h3 font-semibold text-canvas">300+</div>
              <div className="text-tiny uppercase tracking-[0.15em] text-steel">Engineers</div>
            </div>
            <div className="h-8 w-px bg-white/[0.08]" />
            <div>
              <div className="text-h3 font-semibold text-canvas">2</div>
              <div className="text-tiny uppercase tracking-[0.15em] text-steel">Countries</div>
            </div>
            <div className="h-8 w-px bg-white/[0.08]" />
            <div>
              <div className="text-h3 font-semibold text-canvas">24/7</div>
              <div className="text-tiny uppercase tracking-[0.15em] text-steel">Delivery</div>
            </div>
          </div>
        </div>

        {/* Right: rotating text cards */}
        <div className="w-full max-w-md lg:pt-16">
          <RotatingCards />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/[0.08] p-1.5">
          <div className="h-2 w-1 rounded-full bg-white/30 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
