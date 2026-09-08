"use client";

import { useReveal } from "./useReveal";
import {
  Brain, Database, Globe, Cloud, Plug, Shield,
  Briefcase, Users, ArrowUpRight,
} from "lucide-react";

const services = [
  {
    title: "AI Development",
    desc: "Custom AI integrations, chatbots, co-pilots, and predictive analytics tailored to your goals.",
    icon: Brain,
    color: "74, 222, 128",
    link: "Explore AI Development",
  },
  {
    title: "Data Engineering",
    desc: "Turn raw data into actionable insights with pipelines, warehousing, and real-time reporting built for scale.",
    icon: Database,
    color: "34, 211, 238",
    link: "Our Data Engineering Solutions",
  },
  {
    title: "Web Solutions",
    desc: "Launch secure, scalable web applications that evolve with your business and deliver seamless digital experiences.",
    icon: Globe,
    color: "167, 139, 250",
    link: "Discover Our Web App Solutions",
  },
  {
    title: "Cloud Development",
    desc: "Deploy modern, cloud-native applications using AWS, Azure, or GCP — built for reliability, speed, and growth.",
    icon: Cloud,
    color: "74, 222, 128",
    link: "Cloud Development Services",
  },
  {
    title: "Enterprise Integrations",
    desc: "Connect your systems end-to-end with real-time integrations that eliminate silos and streamline operations.",
    icon: Plug,
    color: "34, 211, 238",
    link: "See Enterprise Integration Services",
  },
  {
    title: "API Security",
    desc: "Safeguard your digital ecosystem with robust API security testing and governance to prevent vulnerabilities.",
    icon: Shield,
    color: "167, 139, 250",
    link: "API Security Solutions",
  },
  {
    title: "Workday Solutions",
    desc: "Maximize your Workday investment with implementations, integrations, and managed services for HCM and Finance.",
    icon: Briefcase,
    color: "74, 222, 128",
    link: "Explore Workday Solutions",
  },
  {
    title: "Staffing Solutions",
    desc: "Scale your team with vetted developers and specialists — onshore or offshore — through flexible staffing and SOW models.",
    icon: Users,
    color: "34, 211, 238",
    link: "Learn How We Deliver Results",
  },
];

export default function Services() {
  const ref = useReveal();

  return (
    <section id="services" className="section-line relative px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-content">
        {/* Header */}
        <div ref={ref} className="reveal mb-16 max-w-3xl">
          <p className="mb-4 text-tiny font-medium uppercase tracking-[0.25em] text-accent">
            Our Services
          </p>
          <h2 className="text-h1 font-medium leading-[1.1] text-canvas">
            Services Built Around{" "}
            <span className="font-display italic text-steel-2">Your Goals</span>
          </h2>
          <p className="mt-6 text-body text-steel-2 leading-relaxed max-w-2xl">
            From AI development to staffing, we deliver flexible engagement models
            that scale with your team — SOW projects, managed services, staff
            augmentation, and direct placement.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 gap-px bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="group relative bg-jet p-8 transition-all duration-500 hover:bg-jet-3 lg:p-10"
              >
                {/* Hover gradient top line */}
                <div
                  className="pointer-events-none absolute -top-px left-0 right-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, transparent, rgba(${s.color}, 0.5), transparent)`,
                  }}
                />
                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full opacity-0 blur-[50px] transition-opacity duration-700 group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle, rgba(${s.color}, 0.1), transparent 70%)` }}
                />

                <div className="relative z-10 flex flex-col">
                  {/* Icon */}
                  <div
                    className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-110"
                    style={{
                      borderColor: `rgba(${s.color}, 0.15)`,
                      backgroundColor: `rgba(${s.color}, 0.05)`,
                    }}
                  >
                    <Icon
                      className="h-5 w-5 transition-colors duration-300"
                      style={{ color: `rgb(${s.color})` }}
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-h3 font-medium text-canvas transition-transform duration-300 group-hover:translate-x-1">
                    {s.title}
                  </h3>

                  {/* Description */}
                  <p className="flex-1 text-body-s text-steel-2 leading-relaxed">
                    {s.desc}
                  </p>

                  {/* Link */}
                  <div
                    className="mt-6 flex items-center gap-1.5 text-small font-medium opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1"
                    style={{ color: `rgb(${s.color})` }}
                  >
                    {s.link}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View all */}
        <div className="mt-12 flex justify-center">
          <a
            href="#contact"
            className="btn-wrapper group inline-flex items-center gap-2 rounded-full border border-white/[0.1] px-6 py-3 text-body-s font-medium text-canvas transition-all hover:border-white/[0.25] hover:bg-white/[0.02]"
          >
            View all services
            <span className="btn-arrow">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
