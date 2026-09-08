"use client";

import { useReveal } from "./useReveal";

const principles = [
  {
    title: "We Build",
    body: "We don't just consult — we build. Our own products, platforms, and AI agents go from idea to production inside our delivery centers. SOW projects shipped on time, on budget, on spec.",
  },
  {
    title: "We Staff",
    body: "300+ engineers, analysts, and PMs across India and the USA. We place the right people into state agencies, IT departments, and Workday programs — contract, SOW, or direct hire.",
  },
  {
    title: "State & IT",
    body: "We work with state governments and enterprise IT teams on modernization, integrations, and platform delivery. Compliance-ready, security-first, built for the long haul.",
  },
  {
    title: "Workday",
    body: "Certified Workday consultants for implementations, integrations, and managed services. We staff HCM, Finance, and Adaptive projects that go live and stay live.",
  },
];

export default function Principles() {
  const ref = useReveal();

  return (
    <section id="about" className="section-line relative px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-content">
        <div ref={ref} className="reveal mb-16 max-w-3xl">
          <p className="mb-4 text-tiny font-medium uppercase tracking-[0.25em] text-accent">
            About
          </p>
          <h2 className="text-h1 font-medium text-canvas leading-[1.1]">
            We build our own projects{" "}
            <span className="font-display italic text-steel-2">and staff people.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px bg-white/[0.04] lg:grid-cols-2">
          {principles.map((p, i) => (
            <div
              key={p.title}
              className="group relative bg-jet p-8 transition-all duration-500 hover:bg-jet-3 lg:p-12"
            >
              <div
                className="pointer-events-none absolute -top-px left-0 right-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(74,222,128,0.4), transparent)",
                }}
              />
              <div className="relative z-10">
                <div className="mb-6 flex items-baseline gap-4">
                  <span className="font-display text-h2 text-accent leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-h2 font-medium text-canvas transition-transform duration-300 group-hover:translate-x-1">
                    {p.title}
                  </h3>
                </div>
                <p className="max-w-md text-body-s text-steel-2 leading-relaxed">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
