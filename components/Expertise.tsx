const expertise = [
  "React", "Next.js", "TypeScript", "Node.js", "Python",
  "Go", "Rust", "AWS", "GCP", "Azure",
  "Kubernetes", "PostgreSQL", "MongoDB", "Redis", "GraphQL",
  "Workday", "Salesforce", "ServiceNow", "OpenAI", "LangChain",
];

export default function Expertise() {
  const items = [...expertise, ...expertise];

  return (
    <section className="relative overflow-hidden border-y border-white/[0.04] py-12">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-32 w-[600px] -translate-x-1/2 rounded-full opacity-[0.04] blur-[100px]"
        style={{ background: "radial-gradient(ellipse, #4ade80, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto mb-6 max-w-content px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <p className="text-tiny font-medium uppercase tracking-[0.25em] text-steel">
            Stack
          </p>
          <div className="h-px flex-1 bg-white/[0.06]" />
        </div>
      </div>

      <div className="relative flex">
        <div className="marquee flex shrink-0 items-center gap-10 pr-10">
          {items.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="flex items-center gap-10 text-h3 font-medium text-canvas/20 transition-colors hover:text-canvas/50"
            >
              {tech}
              <span className="text-accent/40 text-small">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
