"use client";

import { useReveal } from "./useReveal";

const jobs = [
  {
    title: "Project Manager / Release Train Engineer",
    meta: "Frisco, Texas · Full-time",
    excerpt:
      "Manage release trains, coordinate cross-functional teams, and drive delivery excellence across enterprise programs.",
    tag: "Delivery",
  },
  {
    title: "Lead Software Developer",
    meta: "Richmond, Texas · Full-time",
    excerpt:
      "Lead development teams, architect solutions, and mentor engineers on modern tech stacks including React, Node, and cloud.",
    tag: "Engineering",
  },
  {
    title: "Workday Integration Consultant",
    meta: "Remote (USA) · Full-time",
    excerpt:
      "Design and implement Workday integrations across HCM, Financials, and Adaptive Planning for enterprise clients.",
    tag: "Workday",
  },
  {
    title: "AI/ML Engineer",
    meta: "Hyderabad, India · Full-time",
    excerpt:
      "Build AI agents, RAG pipelines, and automation systems using LLMs, LangChain, and modern ML frameworks.",
    tag: "AI",
  },
];

export default function Careers() {
  const ref = useReveal();

  return (
    <section id="careers" className="section-line relative px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-content">
        <div ref={ref} className="reveal mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 text-tiny font-medium uppercase tracking-[0.25em] text-accent">
              Careers
            </p>
            <h2 className="text-h1 font-medium leading-[1.1] text-canvas">
              Build things that{" "}
              <span className="font-display italic text-steel-2">matter.</span>
            </h2>
            <p className="mt-6 text-body text-steel-2 leading-relaxed max-w-lg">
              We're a 300-person team across India and the USA, looking for
              people who want to ship real software, not just attend meetings.
            </p>
          </div>
          <a
            href="#contact"
            className="btn-wrapper group inline-flex items-center gap-2 rounded-full border border-white/[0.1] px-6 py-3 text-body-s font-medium text-canvas transition-all hover:border-white/[0.25] hover:bg-white/[0.02]"
          >
            Join the team
            <span className="btn-arrow">↗</span>
          </a>
        </div>

        <div className="flex flex-col">
          {jobs.map((job) => (
            <a
              key={job.title}
              href="#contact"
              className="group relative flex flex-col gap-4 border-b border-white/[0.06] py-7 transition-all duration-300 hover:bg-white/[0.015] lg:flex-row lg:items-center lg:justify-between lg:py-8"
            >
              <div className="absolute left-0 top-1/2 h-0 w-0.5 -translate-y-1/2 bg-accent transition-all duration-300 group-hover:h-10" />

              <div className="lg:max-w-md lg:pl-4">
                <div className="mb-2 flex items-center gap-3">
                  <span className="rounded-full border border-white/[0.06] px-2.5 py-0.5 text-tiny font-medium text-accent">
                    {job.tag}
                  </span>
                </div>
                <h3 className="text-h3 font-medium text-canvas transition-colors duration-300 group-hover:text-accent">
                  {job.title}
                </h3>
                <p className="mt-2 text-small text-steel">{job.meta}</p>
              </div>
              <p className="text-body-s text-steel-2 leading-relaxed lg:max-w-lg">
                {job.excerpt}
              </p>
              <div className="flex items-center gap-2 text-small font-medium text-canvas opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 lg:ml-8">
                Apply
                <span className="btn-arrow">↗</span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-3 text-small text-steel">
          <span>4 open positions</span>
          <span>·</span>
          <a href="#contact" className="text-canvas transition-colors hover:text-accent">
            Send your resume →
          </a>
        </div>
      </div>
    </section>
  );
}
