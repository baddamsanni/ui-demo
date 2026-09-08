import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, type Project } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

// ── Chat mockup (AI agents) ──
function ChatMockup({ p }: { p: Project }) {
  const { bg, card, text, accent } = p.uiColors;
  const messages = p.chat?.length
    ? p.chat
    : [
        { sender: "User", message: p.prompt, agent: false },
        { sender: "AI Agent", message: `I can help with ${p.title}.`, agent: true },
      ];

  return (
    <div className="relative w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/10 p-5 shadow-2xl" style={{ backgroundColor: bg }}>
      <div className="mx-auto mb-5 h-4 w-20 rounded-full bg-black/40" />
      <div className="mb-4 flex items-center gap-3 rounded-2xl p-3" style={{ backgroundColor: card }}>
        <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: accent }}>
          <span className="text-lg">✦</span>
        </div>
        <div>
          <div className="text-sm font-semibold" style={{ color: text }}>{p.title}</div>
          <div className="text-xs opacity-60" style={{ color: text }}>Online now</div>
        </div>
      </div>
      <div className="space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-2 ${m.agent ? "flex-row" : "flex-row-reverse"}`}>
            <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-snug ${m.agent ? "rounded-tl-sm" : "rounded-tr-sm"}`}
              style={{ backgroundColor: m.agent ? card : accent, color: m.agent ? text : "#0a0a0a" }}>
              {m.message}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {["Book demo", "See pricing", "Read docs"].map((a) => (
          <span key={a} className="rounded-full border px-3 py-1.5 text-xs" style={{ borderColor: `${accent}40`, color: accent }}>{a}</span>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-2 rounded-2xl border border-white/10 p-3" style={{ backgroundColor: card }}>
        <div className="h-8 w-full rounded-full opacity-30" style={{ backgroundColor: text }} />
        <div className="h-8 w-8 rounded-full" style={{ backgroundColor: accent }} />
      </div>
    </div>
  );
}

// ── Dashboard mockup (shop owner, fintech) ──
function DashboardMockup({ p }: { p: Project }) {
  const { bg, card, text, accent } = p.uiColors;
  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 p-5 shadow-2xl" style={{ backgroundColor: bg }}>
      <div className="mx-auto mb-5 h-4 w-20 rounded-full bg-black/40" />
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold" style={{ color: text }}>{p.title}</div>
          <div className="text-xs opacity-50" style={{ color: text }}>Dashboard</div>
        </div>
        <div className="h-8 w-8 rounded-full" style={{ backgroundColor: accent }} />
      </div>
      {/* Stat cards */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        {["Revenue", "Orders", "Active Users", "Growth"].map((label, i) => (
          <div key={label} className="rounded-xl border border-white/10 p-3" style={{ backgroundColor: card }}>
            <div className="text-[10px] opacity-50" style={{ color: text }}>{label}</div>
            <div className="mt-1 text-lg font-bold" style={{ color: accent }}>
              {["$48.2k", "1,284", "892", "+23%"][i]}
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-white/5">
              <div className="h-full rounded-full" style={{ width: `${60 + i * 10}%`, backgroundColor: accent }} />
            </div>
          </div>
        ))}
      </div>
      {/* Chart placeholder */}
      <div className="mb-4 rounded-xl border border-white/10 p-4" style={{ backgroundColor: card }}>
        <div className="mb-3 text-[10px] opacity-50" style={{ color: text }}>Weekly Performance</div>
        <div className="flex h-24 items-end gap-2">
          {[40, 65, 50, 80, 55, 90, 70].map((h, i) => (
            <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, backgroundColor: accent, opacity: 0.4 + i * 0.08 }} />
          ))}
        </div>
      </div>
      {/* Recent activity */}
      <div className="space-y-2">
        {["New order #4821", "Payment received $129", "User registered"].map((a) => (
          <div key={a} className="flex items-center gap-2 rounded-lg p-2" style={{ backgroundColor: card }}>
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
            <span className="text-xs" style={{ color: text }}>{a}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Storefront mockup (retail) ──
function StorefrontMockup({ p }: { p: Project }) {
  const { bg, card, text, accent } = p.uiColors;
  return (
    <div className="relative w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/10 p-5 shadow-2xl" style={{ backgroundColor: bg }}>
      <div className="mx-auto mb-5 h-4 w-20 rounded-full bg-black/40" />
      {/* Search bar */}
      <div className="mb-4 flex items-center gap-2 rounded-full border border-white/10 p-2.5" style={{ backgroundColor: card }}>
        <div className="h-4 w-4 rounded-full border" style={{ borderColor: accent }} />
        <span className="text-xs opacity-40" style={{ color: text }}>{p.prompt}</span>
      </div>
      {/* Category chips */}
      <div className="mb-4 flex gap-2 overflow-hidden">
        {["All", "Electronics", "Fashion", "Home"].map((c, i) => (
          <span key={c} className="rounded-full px-3 py-1.5 text-xs font-medium"
            style={{ backgroundColor: i === 0 ? accent : card, color: i === 0 ? "#0a0a0a" : text }}>
            {c}
          </span>
        ))}
      </div>
      {/* Product grid */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        {["Headphones", "Smart Watch", "Sneakers", "Backpack"].map((prod) => (
          <div key={prod} className="rounded-xl border border-white/10 p-3" style={{ backgroundColor: card }}>
            <div className="mb-3 h-20 rounded-lg" style={{ background: `linear-gradient(135deg, ${accent}30, ${accent}10)` }} />
            <div className="text-xs font-semibold" style={{ color: text }}>{prod}</div>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-sm font-bold" style={{ color: accent }}>${Math.floor(Math.random() * 200 + 50)}</span>
              <div className="h-6 w-6 rounded-full flex items-center justify-center" style={{ backgroundColor: accent }}>
                <span className="text-xs text-black">+</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Cart bar */}
      <div className="flex items-center justify-between rounded-2xl p-3" style={{ backgroundColor: accent }}>
        <span className="text-sm font-semibold text-black">View cart (3 items)</span>
        <span className="text-sm font-bold text-black">$284</span>
      </div>
    </div>
  );
}

// ── Maintenance mockup ──
function MaintenanceMockup({ p }: { p: Project }) {
  const { bg, card, text, accent } = p.uiColors;
  const tickets = [
    { id: "WO-0142", title: "HVAC Unit 3 — filter replacement", priority: "High", status: "Open" },
    { id: "WO-0141", title: "Elevator B — annual inspection", priority: "Medium", status: "In Progress" },
    { id: "WO-0140", title: "Server Room AC — temp alert", priority: "Critical", status: "Open" },
    { id: "WO-0139", title: "Lighting — floor 4 replacement", priority: "Low", status: "Resolved" },
  ];
  const priorityColor: Record<string, string> = { Critical: "#ef4444", High: "#f59e0b", Medium: "#3b82f6", Low: "#22c55e" };
  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 p-5 shadow-2xl" style={{ backgroundColor: bg }}>
      <div className="mx-auto mb-5 h-4 w-20 rounded-full bg-black/40" />
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm font-semibold" style={{ color: text }}>{p.title}</div>
        <div className="rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: accent, color: "#0a0a0a" }}>+ New Ticket</div>
      </div>
      {/* Stats */}
      <div className="mb-4 grid grid-cols-3 gap-2">
        {["Open", "In Progress", "Resolved"].map((s, i) => (
          <div key={s} className="rounded-lg border border-white/10 p-2.5 text-center" style={{ backgroundColor: card }}>
            <div className="text-lg font-bold" style={{ color: accent }}>{[3, 1, 8][i]}</div>
            <div className="text-[9px] opacity-50" style={{ color: text }}>{s}</div>
          </div>
        ))}
      </div>
      {/* Ticket list */}
      <div className="space-y-2">
        {tickets.map((t) => (
          <div key={t.id} className="flex items-center gap-3 rounded-xl border border-white/10 p-3" style={{ backgroundColor: card }}>
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${priorityColor[t.priority]}30` }}>
              <span className="text-xs" style={{ color: priorityColor[t.priority] }}>●</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold truncate" style={{ color: text }}>{t.title}</div>
              <div className="text-[10px] opacity-40" style={{ color: text }}>{t.id}</div>
            </div>
            <span className="rounded-full px-2 py-0.5 text-[9px] font-medium" style={{ backgroundColor: `${priorityColor[t.priority]}20`, color: priorityColor[t.priority] }}>{t.priority}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Logistics mockup ──
function LogisticsMockup({ p }: { p: Project }) {
  const { bg, card, text, accent } = p.uiColors;
  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 p-5 shadow-2xl" style={{ backgroundColor: bg }}>
      <div className="mx-auto mb-5 h-4 w-20 rounded-full bg-black/40" />
      <div className="mb-4 text-sm font-semibold" style={{ color: text }}>{p.title}</div>
      {/* Map area */}
      <div className="mb-4 h-40 rounded-xl border border-white/10 relative overflow-hidden" style={{ backgroundColor: card }}>
        <div className="absolute inset-0 opacity-30" style={{ background: `radial-gradient(circle at 60% 40%, ${accent}40, transparent 60%)` }} />
        {/* Route line */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 160">
          <path d="M50,120 Q150,40 200,80 T350,50" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="6 4" />
          <circle cx="50" cy="120" r="6" fill={accent} />
          <circle cx="350" cy="50" r="6" fill={accent} />
        </svg>
        <div className="absolute bottom-2 left-3 text-[10px] opacity-60" style={{ color: text }}>Live GPS · 12 active shipments</div>
      </div>
      {/* Shipment cards */}
      <div className="space-y-2">
        {[
          { id: "SH-88210", route: "Dallas → Houston", eta: "2h 15m", status: "In transit" },
          { id: "SH-88209", route: "Austin → San Antonio", eta: "45m", status: "Delivering" },
          { id: "SH-88208", route: "Denver → Boulder", eta: "Delivered", status: "Complete" },
        ].map((s) => (
          <div key={s.id} className="flex items-center gap-3 rounded-xl border border-white/10 p-3" style={{ backgroundColor: card }}>
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${accent}20` }}>
              <span style={{ color: accent }}>🚚</span>
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold" style={{ color: text }}>{s.id}</div>
              <div className="text-[10px] opacity-40" style={{ color: text }}>{s.route}</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-semibold" style={{ color: accent }}>{s.eta}</div>
              <div className="text-[9px] opacity-40" style={{ color: text }}>{s.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Healthcare mockup ──
function HealthcareMockup({ p }: { p: Project }) {
  const { bg, card, text, accent } = p.uiColors;
  return (
    <div className="relative w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/10 p-5 shadow-2xl" style={{ backgroundColor: bg }}>
      <div className="mx-auto mb-5 h-4 w-20 rounded-full bg-black/40" />
      <div className="mb-4 text-sm font-semibold" style={{ color: text }}>{p.title}</div>
      {/* Next appointment */}
      <div className="mb-4 rounded-xl border border-white/10 p-4" style={{ backgroundColor: card }}>
        <div className="text-[10px] opacity-50 mb-1" style={{ color: text }}>Next Appointment</div>
        <div className="text-sm font-semibold" style={{ color: text }}>Dr. Patel — Cardiology</div>
        <div className="mt-1 text-xs" style={{ color: accent }}>Tomorrow, 10:30 AM</div>
        <div className="mt-3 flex gap-2">
          <span className="rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: accent, color: "#0a0a0a" }}>Join Video</span>
          <span className="rounded-full border px-3 py-1 text-xs" style={{ borderColor: `${accent}40`, color: text }}>Reschedule</span>
        </div>
      </div>
      {/* Lab results */}
      <div className="mb-4 rounded-xl border border-white/10 p-4" style={{ backgroundColor: card }}>
        <div className="text-[10px] opacity-50 mb-2" style={{ color: text }}>Recent Lab Results</div>
        {["Cholesterol", "Blood Sugar", "Vitamin D"].map((lab, i) => (
          <div key={lab} className="mb-2 flex items-center justify-between">
            <span className="text-xs" style={{ color: text }}>{lab}</span>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-16 rounded-full bg-white/5">
                <div className="h-full rounded-full" style={{ width: `${70 + i * 10}%`, backgroundColor: accent }} />
              </div>
              <span className="text-[10px]" style={{ color: i === 1 ? "#ef4444" : accent }}>{["Normal", "High", "Low"][i]}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-2">
        {["Book", "Refill", "Message"].map((a) => (
          <div key={a} className="rounded-xl border border-white/10 p-3 text-center" style={{ backgroundColor: card }}>
            <div className="mb-1 h-6 w-6 mx-auto rounded-full" style={{ backgroundColor: `${accent}30` }} />
            <span className="text-[10px] font-medium" style={{ color: text }}>{a}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectMockUI({ p }: { p: Project }) {
  switch (p.mockup) {
    case "dashboard": return <DashboardMockup p={p} />;
    case "storefront": return <StorefrontMockup p={p} />;
    case "maintenance": return <MaintenanceMockup p={p} />;
    case "logistics": return <LogisticsMockup p={p} />;
    case "healthcare": return <HealthcareMockup p={p} />;
    default: return <ChatMockup p={p} />;
  }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <main className="section-glow relative min-h-screen bg-jet px-6 py-10 lg:px-10 overflow-hidden">
      {/* Ambient backlight */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full opacity-[0.05] blur-[140px]"
          style={{ background: `radial-gradient(ellipse, ${project.uiColors.accent}, transparent 70%)` }}
        />
        <div
          className="absolute right-0 top-1/3 h-[300px] w-[400px] rounded-full opacity-[0.02] blur-[120px]"
          style={{ background: "radial-gradient(circle, #fcfdff, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-content">
        {/* Back */}
        <Link href="/" className="btn-wrapper group inline-flex items-center gap-2 text-small text-steel transition-colors hover:text-canvas">
          <span className="btn-arrow rotate-180">↗</span>
          Back home
        </Link>

        {/* Header */}
        <div className="mt-8 flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <div className={`mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-gradient-to-r ${project.gradient} px-3 py-1.5 text-small text-canvas`}>
              <span className="font-medium uppercase tracking-wide opacity-80">{project.typeLabel}</span>
            </div>
            <h1 className="text-hero-l font-medium leading-tight text-canvas lg:text-hero-xl">
              {project.title}
            </h1>
            <p className="mt-4 text-body text-canvas/60">{project.tagline}</p>
            <p className="mt-6 text-body-l text-felt-grey leading-relaxed">
              {project.description}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {project.features.map((f) => (
                <div key={f} className="card-glow group flex items-start gap-3 rounded-6 border border-white/[0.06] p-4 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.02]">
                  <span className="mt-0.5 h-2 w-2 rounded-full transition-transform duration-300 group-hover:scale-125" style={{ backgroundColor: project.uiColors.accent }} />
                  <span className="text-body-s text-felt-grey">{f}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-4">
              <a href="mailto:info@sdhsystems.com?subject=Project%20Inquiry" className="btn-wrapper group inline-flex items-center gap-2 rounded-full bg-canvas px-7 py-3.5 text-body-s font-medium text-jet transition-transform hover:scale-[1.02]">
                Start this project
                <span className="btn-arrow">↗</span>
              </a>
              <a href="/#services" className="inline-flex items-center gap-2 rounded-full border border-canvas/20 px-7 py-3.5 text-body-s font-medium text-canvas transition-colors hover:border-canvas/60">
                View all services
              </a>
            </div>
          </div>

          {/* Project mockup */}
          <div className="relative flex justify-center lg:justify-end lg:sticky lg:top-24">
            {/* Backlight behind mockup */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[3rem] opacity-20 blur-[80px]"
              style={{ background: `radial-gradient(ellipse at center, ${project.uiColors.accent}, transparent 70%)` }}
            />
            <div className="relative z-10">
              <ProjectMockUI p={project} />
            </div>
          </div>
        </div>

        {/* More projects */}
        <section className="mt-24 border-t border-white/10 pt-12">
          <h2 className="mb-8 text-h2 font-medium text-canvas">
            More projects we build
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.filter((p) => p.slug !== project.slug).map((p) => (
              <Link key={p.slug} href={`/projects/${p.slug}`}
                className="card-glow group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.15] hover:bg-white/[0.05]">
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${p.gradient} opacity-[0.08] transition-opacity duration-500 group-hover:opacity-[0.15]`} />
                {/* Hover backlight */}
                <div
                  className="pointer-events-none absolute -top-12 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                  style={{ background: `radial-gradient(circle, ${p.uiColors.accent}, transparent 70%)` }}
                />
                <div className="relative z-10">
                  <div className="mb-2 text-[10px] font-medium uppercase tracking-wide" style={{ color: p.uiColors.accent }}>{p.typeLabel}</div>
                  <h3 className="mb-2 text-h3 font-medium text-canvas transition-transform duration-300 group-hover:translate-x-1">{p.title}</h3>
                  <p className="text-small text-steel">{p.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
