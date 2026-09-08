"use client";

import { useReveal } from "./useReveal";

const highEndClients = [
  "Microsoft", "Amazon", "Google Cloud", "IBM", "Oracle",
  "Salesforce", "ServiceNow", "Workday", "SAP", "Adobe",
];

const directPartners = [
  "TCS", "Wipro", "Infosys", "HCLTech", "Tech Mahindra",
  "Cognizant", "Capgemini", "Accenture", "Robert Half", "Aerotek",
  "Kelly Services", "ManpowerGroup",
];

const capabilities = [
  {
    label: "SOW Delivery",
    desc: "Statement of Work engagements delivered end-to-end — scoped, fixed-bid, or T&M with defined milestones.",
    metric: "End-to-end",
  },
  {
    label: "300-Person Team",
    desc: "Engineers, analysts, and PMs across India and the USA, staffed for follow-the-sun delivery.",
    metric: "India + USA",
  },
  {
    label: "State & Private",
    desc: "Cleared for state government and private enterprise programs with compliant onboarding.",
    metric: "Compliant",
  },
  {
    label: "Workday",
    desc: "Implementations, integrations, and managed services — HCM, Financials, Adaptive Planning.",
    metric: "Certified",
  },
];

function Marquee({
  items,
  reverse = false,
  speed = 40,
}: {
  items: string[];
  reverse?: boolean;
  speed?: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="relative flex overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-jet to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-jet to-transparent" />
      <div
        className="flex shrink-0 items-center gap-16 pr-16"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {doubled.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="whitespace-nowrap text-h3 font-medium text-canvas/25 transition-colors hover:text-canvas/70 lg:text-h2"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Partners() {
  const ref = useReveal();

  return (
    <section className="section-line relative border-y border-white/[0.04] py-24">
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <div ref={ref} className="reveal mb-12 max-w-3xl">
          <p className="mb-4 text-tiny font-medium uppercase tracking-[0.25em] text-accent">
            How we engage
          </p>
          <h2 className="text-h1 font-medium leading-[1.1] text-canvas">
            SOW projects, staffed by a{" "}
            <span className="gradient-text">300-person team</span>{" "}
            <span className="font-display italic text-steel-2">across two continents.</span>
          </h2>
        </div>

        {/* Capability cards */}
        <div className="mb-16 grid grid-cols-1 gap-px bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c, i) => (
            <div
              key={c.label}
              className="group relative bg-jet p-8 transition-all duration-500 hover:bg-jet-3 lg:p-8"
            >
              <div
                className="pointer-events-none absolute -top-px left-0 right-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.4), transparent)",
                }}
              />
              <div className="relative z-10">
                <div className="mb-4 text-tiny font-medium uppercase tracking-[0.15em] text-accent-2">
                  {c.metric}
                </div>
                <h3 className="mb-3 text-body-l font-medium text-canvas transition-transform duration-300 group-hover:translate-x-1">
                  {c.label}
                </h3>
                <p className="text-small text-steel-2 leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* High-end clients */}
        <div className="mb-8 flex items-center gap-4">
          <p className="text-tiny font-medium uppercase tracking-[0.2em] text-steel">
            Trusted by enterprise teams
          </p>
          <div className="h-px flex-1 bg-white/[0.06]" />
        </div>
      </div>
      <Marquee items={highEndClients} speed={45} />

      <div className="mx-auto mb-8 mt-16 max-w-content px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <p className="text-tiny font-medium uppercase tracking-[0.2em] text-steel">
            Direct partners
          </p>
          <div className="h-px flex-1 bg-white/[0.06]" />
        </div>
      </div>
      <Marquee items={directPartners} reverse speed={38} />
    </section>
  );
}
