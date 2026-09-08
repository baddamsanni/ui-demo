"use client";

import { useReveal } from "./useReveal";
import Counter from "./Counter";

const stats = [
  { value: 300, suffix: "+", label: "Engineers & PMs" },
  { value: 2, suffix: "", label: "Countries" },
  { value: 24, suffix: "/7", label: "Delivery" },
  { value: 365, suffix: "", label: "Days a year" },
];

const testimonials = [
  {
    quote:
      "SDH Systems is an integrated extension of our team. They bring valuable perspectives we don't get from other partners. We recommend them without reservation.",
    author: "Client Partner",
    role: "Enterprise Customer",
  },
  {
    quote:
      "The biggest difference between SDH and other shops is their agility. We've thrown them a lot of curveballs, and they've always found a solution that ships.",
    author: "Technical Director",
    role: "IT Services Client",
  },
  {
    quote:
      "Working with SDH was a standout experience. They took the time to understand our needs, and their preparation showed from day one. Their leadership team sets them apart.",
    author: "VP of Engineering",
    role: "Staffing Partner",
  },
];

export default function Stats() {
  const ref = useReveal();

  return (
    <section className="section-line relative px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-content">
        {/* Stats row */}
        <div
          ref={ref}
          className="reveal reveal-stagger mb-20 grid grid-cols-2 gap-8 border-y border-white/[0.06] py-12 lg:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-hero-l font-semibold text-canvas">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-3 text-tiny font-medium uppercase tracking-[0.2em] text-steel">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Section heading */}
        <div className="mb-12 max-w-3xl">
          <p className="mb-4 text-tiny font-medium uppercase tracking-[0.25em] text-accent">
            Testimonials
          </p>
          <h2 className="text-h1 font-medium text-canvas leading-[1.1]">
            What clients say{" "}
            <span className="font-display italic text-steel-2">when it ships.</span>
          </h2>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group relative flex flex-col overflow-hidden rounded-16 border border-white/[0.06] bg-jet-2 p-8 transition-all duration-500 hover:border-white/[0.12] lg:p-10"
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full opacity-0 blur-[50px] transition-opacity duration-700 group-hover:opacity-100"
                style={{ background: "radial-gradient(circle, rgba(167,139,250,0.08), transparent 70%)" }}
              />
              <div className="relative z-10 flex flex-1 flex-col">
                <div className="mb-4 font-display text-h1 text-accent leading-none">&ldquo;</div>
                <p className="mb-8 flex-1 text-body-s text-canvas/80 leading-relaxed">
                  {t.quote}
                </p>
                <div className="border-t border-white/[0.06] pt-6">
                  <div className="text-body-s font-semibold text-canvas">{t.author}</div>
                  <div className="mt-1 text-small text-steel">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
