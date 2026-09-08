"use client";

import { useReveal } from "./useReveal";

const pillars = [
  {
    title: "Strategy",
    desc: "We start with your business outcome, not a tech stack. Every engagement begins with a roadmap tied to measurable delivery milestones.",
    icon: "compass",
  },
  {
    title: "Engineering",
    desc: "Full-stack teams fluent in modern frameworks, cloud infrastructure, and AI integration. We ship production code, not prototypes.",
    icon: "code",
  },
  {
    title: "Staffing",
    desc: "Contract, contract-to-hire, and direct placement across IT, engineering, and enterprise platforms. Vetted talent, fast turnaround.",
    icon: "users",
  },
  {
    title: "Automation",
    desc: "AI agents and workflow automation that reduce manual work. We build systems that run 24/7 so your team doesn't have to.",
    icon: "bolt",
  },
  {
    title: "Analytics",
    desc: "Dashboards, data pipelines, and BI systems that turn operational data into decisions. Real-time visibility, not monthly reports.",
    icon: "chart",
  },
  {
    title: "Delivery",
    desc: "SOW-managed projects with dedicated PMs, follow-the-sun development, and unlimited support. We own the outcome end-to-end.",
    icon: "rocket",
  },
];

const iconPaths: Record<string, string> = {
  compass: "M12 2a10 10 0 100 20 10 10 0 000-20zM16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z",
  code: "M16 18l6-6-6-6M8 6l-6 6 6 6",
  users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  bolt: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  chart: "M3 3v18h18M7 14l4-4 4 4 5-5",
  rocket: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09zM12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z",
};

export default function Pillars() {
  const ref = useReveal();

  return (
    <section className="section-line relative border-t border-white/[0.04] px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-content">
        <div ref={ref} className="reveal mb-16 max-w-3xl">
          <p className="mb-4 text-tiny font-medium uppercase tracking-[0.25em] text-accent">
            What we do
          </p>
          <h2 className="text-h1 font-medium text-canvas leading-[1.1]">
            Six disciplines.{" "}
            <span className="font-display italic text-steel-2">One delivery team.</span>
          </h2>
          <p className="mt-6 text-body text-steel-2 leading-relaxed max-w-xl">
            From strategy to shipped software, SDH Systems covers the full
            delivery lifecycle. We blend consulting, engineering, and staffing
            into a single accountable partner.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className="group relative bg-jet p-8 transition-all duration-500 hover:bg-jet-3 lg:p-10"
            >
              {/* Hover glow */}
              <div
                className="pointer-events-none absolute -top-px left-0 right-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(74,222,128,0.4), transparent)",
                }}
              />
              <div className="relative z-10">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-12 border border-white/[0.06] bg-white/[0.02] transition-all duration-300 group-hover:border-accent/30 group-hover:bg-accent/[0.05]">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-steel-2 transition-colors duration-300 group-hover:text-accent"
                    >
                      <path d={iconPaths[p.icon]} />
                    </svg>
                  </div>
                  <span className="text-tiny font-medium tabular-nums text-steel">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mb-3 text-h3 font-medium text-canvas transition-transform duration-300 group-hover:translate-x-1">
                  {p.title}
                </h3>
                <p className="text-body-s text-steel-2 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
