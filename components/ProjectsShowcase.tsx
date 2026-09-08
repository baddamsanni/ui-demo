"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { projects, type Project, type PillIcon } from "@/lib/projects";
import {
  Brain, BookOpen, Users, MessageSquare, Shield, FileText,
  Zap, Mail, Search, PenTool, Plug, BarChart, Target, Calendar,
  Star, RefreshCw, ShoppingBag, CreditCard, Truck, Package,
  Wrench, Clipboard, Heart, Stethoscope, Building, Globe,
  Smartphone, Database, Cloud, Lock, TrendingUp, Bell, MapPin,
  Sparkles, Send, ArrowUpRight, CheckCircle, Clock, Activity,
} from "lucide-react";

const iconMap: Record<PillIcon, React.ComponentType<any>> = {
  brain: Brain, bookOpen: BookOpen, users: Users, messageSquare: MessageSquare,
  shield: Shield, fileText: FileText, zap: Zap, mail: Mail, search: Search,
  penTool: PenTool, plug: Plug, barChart: BarChart, target: Target,
  calendar: Calendar, star: Star, refreshCw: RefreshCw, shoppingBag: ShoppingBag,
  creditCard: CreditCard, truck: Truck, package: Package, wrench: Wrench,
  clipboard: Clipboard, heart: Heart, stethoscope: Stethoscope, building: Building,
  globe: Globe, smartphone: Smartphone, database: Database, cloud: Cloud,
  lock: Lock, trendingUp: TrendingUp, bell: Bell, mapPin: MapPin,
};

// ── Mobile breakpoint hook ──
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}

// ════════════════════════════════════════════════════════════
// HD WEBSITE MOCKUPS — rich, detailed, 4K-quality UI renders
// ════════════════════════════════════════════════════════════

function WebsiteMockup({ p, accent }: { p: Project; accent: string }) {
  const m = p.mockup;

  // ── Storefront: premium e-commerce ──
  if (m === "storefront") {
    return (
      <div className="flex h-full flex-col bg-gradient-to-b from-white to-gray-50">
        {/* Nav bar */}
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <div className="h-3.5 w-3.5 rounded-md" style={{ backgroundColor: accent }} />
            <div className="text-[11px] font-bold text-gray-900">ShopHub</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2 w-8 rounded bg-gray-200" />
            <div className="h-2 w-8 rounded bg-gray-200" />
            <div className="flex h-4 w-4 items-center justify-center rounded-full" style={{ backgroundColor: `${accent}20` }}>
              <ShoppingBag className="h-2 w-2" style={{ color: accent }} />
            </div>
          </div>
        </div>
        {/* Hero banner */}
        <div className="mx-4 mt-3 h-14 rounded-xl flex items-center justify-between px-4" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}80)` }}>
          <div>
            <div className="text-[10px] font-bold text-white">SUMMER SALE</div>
            <div className="text-[7px] text-white/80">Up to 50% off</div>
          </div>
          <div className="rounded-full bg-white/20 px-2 py-0.5 text-[7px] font-bold text-white">SHOP NOW</div>
        </div>
        {/* Product grid */}
        <div className="grid grid-cols-3 gap-2 p-4 flex-1">
          {[1,2,3,4,5,6].map((n) => (
            <div key={n} className="rounded-xl border border-gray-100 bg-white p-2 flex flex-col shadow-sm">
              <div className="mb-1.5 h-10 rounded-lg" style={{ background: `linear-gradient(135deg, ${accent}${n % 2 ? "15" : "25"}, ${accent}05)` }} />
              <div className="h-1.5 w-full rounded bg-gray-200" />
              <div className="mt-0.5 h-1 w-2/3 rounded bg-gray-100" />
              <div className="mt-1.5 flex items-center justify-between">
                <div className="text-[8px] font-bold" style={{ color: accent }}>${(n * 49).toFixed(0)}</div>
                <div className="flex items-center gap-0.5">
                  <Star className="h-1.5 w-1.5 fill-amber-400 text-amber-400" />
                  <span className="text-[6px] text-gray-500">4.{n}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Dashboard: analytics with rich charts ──
  if (m === "dashboard") {
    return (
      <div className="flex h-full flex-col bg-[#0a0b0d]">
        <div className="flex flex-1">
          {/* Sidebar */}
          <div className="w-14 border-r border-white/[0.06] p-2.5 flex flex-col gap-2.5">
            <div className="h-4 w-4 rounded-lg flex items-center justify-center" style={{ backgroundColor: accent }}>
              <BarChart className="h-2 w-2 text-white" />
            </div>
            <div className="h-4 w-4 rounded-lg bg-white/[0.06]" />
            <div className="h-4 w-4 rounded-lg bg-white/[0.06]" />
            <div className="h-4 w-4 rounded-lg bg-white/[0.06]" />
            <div className="mt-auto h-4 w-4 rounded-full bg-white/[0.1]" />
          </div>
          {/* Main content */}
          <div className="flex-1 p-3">
            {/* Header */}
            <div className="mb-2.5 flex items-center justify-between">
              <div className="text-[10px] font-bold text-white">Overview</div>
              <div className="flex items-center gap-1.5">
                <div className="rounded-full px-2 py-0.5 text-[7px] font-medium" style={{ backgroundColor: `${accent}20`, color: accent }}>+23%</div>
              </div>
            </div>
            {/* Stat cards */}
            <div className="mb-2.5 grid grid-cols-3 gap-2">
              {[
                { label: "Revenue", value: "$48.2k", icon: TrendingUp },
                { label: "Orders", value: "1,284", icon: ShoppingBag },
                { label: "Users", value: "8,491", icon: Users },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-2">
                  <div className="mb-1 flex items-center gap-1">
                    <s.icon className="h-2 w-2" style={{ color: accent }} />
                    <div className="text-[6px] uppercase tracking-wider text-white/40">{s.label}</div>
                  </div>
                  <div className="text-[11px] font-bold text-white">{s.value}</div>
                </div>
              ))}
            </div>
            {/* Chart */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-2.5 flex-1 flex flex-col">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-[8px] font-medium text-white/60">Revenue Trend</div>
                <div className="flex gap-1">
                  <div className="h-1 w-3 rounded" style={{ backgroundColor: accent }} />
                  <div className="h-1 w-3 rounded bg-white/20" />
                </div>
              </div>
              <div className="flex items-end gap-1 flex-1" style={{ minHeight: 50 }}>
                {[35,55,40,70,50,85,60,90,65,95,75,100].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-sm transition-all" style={{ height: `${h}%`, background: `linear-gradient(180deg, ${accent}, ${accent}30)` }} />
                ))}
              </div>
              <div className="mt-1 flex justify-between text-[5px] text-white/30">
                <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Chat: AI chatbot on website ──
  // ── Customer-Facing Chat Agent: full chat conversation ──
  if (m === "chat" && p.slug === "ai-chatbots") {
    return (
      <div className="flex h-full flex-col bg-[#0a0b0d]">
        {/* Chat header */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
          <div className="relative h-5 w-5 rounded-full flex items-center justify-center" style={{ backgroundColor: accent }}>
            <Sparkles className="h-2.5 w-2.5 text-white" />
            <div className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-green-400 border-2 border-[#0a0b0d]" />
          </div>
          <div className="flex-1">
            <div className="text-[10px] font-bold text-white">Support Agent</div>
            <div className="text-[7px] text-green-400">● Online · responds in 2s</div>
          </div>
          <div className="h-4 w-4 rounded-full bg-white/[0.06]" />
        </div>
        {/* Messages */}
        <div className="flex-1 space-y-2 p-3 overflow-hidden">
          {/* Customer msg */}
          <div className="flex justify-end">
            <div className="max-w-[70%] rounded-2xl rounded-tr-sm px-3 py-2 text-[9px] leading-relaxed text-white" style={{ backgroundColor: `${accent}25` }}>
              Where is my refund for order #48291?
            </div>
          </div>
          {/* Agent msg with order card */}
          <div className="flex justify-start gap-1.5">
            <div className="h-4 w-4 shrink-0 rounded-full flex items-center justify-center" style={{ backgroundColor: accent }}>
              <Sparkles className="h-2 w-2 text-white" />
            </div>
            <div className="max-w-[75%] space-y-1.5">
              <div className="rounded-2xl rounded-tl-sm bg-white/[0.06] px-3 py-2 text-[9px] leading-relaxed text-white/80">
                I found order #48291. A refund of $129 was issued on May 12.
              </div>
              {/* Order status card */}
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-2.5">
                <div className="mb-1.5 flex items-center justify-between">
                  <div className="text-[8px] font-bold text-white">Order #48291</div>
                  <div className="rounded-full px-2 py-0.5 text-[6px] font-bold" style={{ backgroundColor: `${accent}25`, color: accent }}>REFUNDED</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="h-2 w-2" style={{ color: "#4ade80" }} />
                    <span className="text-[7px] text-white/60">Refund processed</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-2 w-2 text-white/30" />
                    <span className="text-[7px] text-white/40">ETA: 2-3 business days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Typing indicator */}
          <div className="flex items-center gap-1.5 pl-5">
            <div className="flex gap-0.5 rounded-2xl rounded-tl-sm bg-white/[0.06] px-3 py-2">
              <div className="h-1 w-1 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="h-1 w-1 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="h-1 w-1 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        </div>
        {/* Input bar */}
        <div className="border-t border-white/[0.06] p-2.5">
          <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 py-2">
            <div className="flex-1 text-[8px] text-white/30">Type a message...</div>
            <div className="h-5 w-5 rounded-full flex items-center justify-center" style={{ backgroundColor: accent }}>
              <Send className="h-2.5 w-2.5 text-white" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Enterprise Knowledge Agent: Slack/Teams command palette ──
  if (m === "chat" && p.slug === "enterprise-knowledge-agent") {
    return (
      <div className="flex h-full flex-col bg-[#0a0b0d]">
        {/* Slack-style header */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded bg-white/10" />
            <div className="text-[9px] font-bold text-white">#general</div>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-white/[0.08]" />
            <div className="h-3 w-3 rounded-full bg-white/[0.08]" />
          </div>
        </div>
        {/* Chat messages — Slack style */}
        <div className="flex-1 space-y-2.5 p-3 overflow-hidden">
          {/* User question */}
          <div className="flex items-start gap-2">
            <div className="h-5 w-5 shrink-0 rounded-full bg-white/10" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[8px] font-bold text-white">Sam</span>
                <span className="text-[6px] text-white/30">10:42 AM</span>
              </div>
              <div className="text-[9px] leading-relaxed text-white/70">What's the travel policy for India employees?</div>
            </div>
          </div>
          {/* Agent response with citation */}
          <div className="flex items-start gap-2">
            <div className="h-5 w-5 shrink-0 rounded-full flex items-center justify-center" style={{ backgroundColor: accent }}>
              <Brain className="h-2.5 w-2.5 text-white" />
            </div>
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-[8px] font-bold" style={{ color: accent }}>Knowledge Agent</span>
                <span className="rounded-full px-1.5 py-0.5 text-[5px] font-bold" style={{ backgroundColor: `${accent}20`, color: accent }}>APP</span>
              </div>
              <div className="text-[9px] leading-relaxed text-white/80">
                India employees get ₹15,000/month for local travel and ₹50,000/quarter for international. Requires manager pre-approval.
              </div>
              {/* Citation card */}
              <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-2">
                <div className="mb-1 flex items-center gap-1">
                  <FileText className="h-2 w-2" style={{ color: accent }} />
                  <span className="text-[6px] font-bold uppercase tracking-wider text-white/40">Source</span>
                </div>
                <div className="text-[7px] text-white/60">HR-Policy-2024.pdf · Page 12</div>
                <div className="mt-1 flex items-center gap-1">
                  <div className="h-1 flex-1 rounded-full bg-white/[0.06]">
                    <div className="h-1 rounded-full" style={{ width: "78%", backgroundColor: accent }} />
                  </div>
                  <span className="text-[5px] text-white/30">78% match</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Input bar */}
        <div className="border-t border-white/[0.06] p-2.5">
          <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 py-2">
            <div className="flex-1 text-[8px] text-white/30">Ask the knowledge agent...</div>
            <div className="h-5 w-5 rounded-full flex items-center justify-center" style={{ backgroundColor: accent }}>
              <Send className="h-2.5 w-2.5 text-white" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Recruiting Agent: candidate pipeline dashboard ──
  if (m === "chat" && p.slug === "ai-recruiting") {
    return (
      <div className="flex h-full flex-col bg-[#0a0b0d]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <div className="h-3.5 w-3.5 rounded-md flex items-center justify-center" style={{ backgroundColor: `${accent}20` }}>
              <Target className="h-2 w-2" style={{ color: accent }} />
            </div>
            <div className="text-[10px] font-bold text-white">Candidate Pipeline</div>
          </div>
          <div className="rounded-full px-2 py-0.5 text-[7px] font-medium" style={{ backgroundColor: `${accent}20`, color: accent }}>8 matches</div>
        </div>
        {/* Job match bar */}
        <div className="px-3 pt-2.5 pb-2">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-2">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-[7px] font-bold text-white">Senior React Developer</span>
              <span className="text-[6px] text-white/40">Austin, TX</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-1 flex-1 rounded-full bg-white/[0.06]">
                <div className="h-1 rounded-full" style={{ width: "94%", backgroundColor: accent }} />
              </div>
              <span className="text-[6px] font-bold" style={{ color: accent }}>94%</span>
            </div>
          </div>
        </div>
        {/* Candidate cards */}
        <div className="flex-1 space-y-1.5 px-3 pb-2.5 overflow-hidden">
          {[
            { name: "Alex Chen", score: 94, skills: ["React", "TS", "AWS"], status: "Available" },
            { name: "Priya N.", score: 91, skills: ["React", "Node", "GCP"], status: "Available" },
            { name: "Marcus K.", score: 88, skills: ["React", "GraphQL"], status: "2 weeks" },
          ].map((c, i) => (
            <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-2 flex items-center gap-2">
              <div className="h-6 w-6 rounded-full flex items-center justify-center text-[8px] font-bold text-white" style={{ backgroundColor: `${accent}30` }}>
                {c.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[8px] font-bold text-white truncate">{c.name}</span>
                  <span className="text-[6px] font-bold" style={{ color: accent }}>{c.score}%</span>
                </div>
                <div className="mt-0.5 flex gap-1">
                  {c.skills.map((s) => (
                    <span key={s} className="rounded px-1 py-0.5 text-[5px] font-medium bg-white/[0.06] text-white/50">{s}</span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end gap-0.5">
                <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                <span className="text-[5px] text-white/40">{c.status}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Action bar */}
        <div className="border-t border-white/[0.06] p-2.5 flex gap-2">
          <div className="flex-1 rounded-lg border border-white/[0.08] bg-white/[0.02] px-2.5 py-1.5 text-[7px] text-white/30">Search candidates...</div>
          <div className="rounded-lg px-2.5 py-1.5 text-[7px] font-bold text-white" style={{ backgroundColor: accent }}>Schedule</div>
        </div>
      </div>
    );
  }

  // ── Default chat fallback (shouldn't reach) ──
  if (m === "chat") {
    return <div className="bg-[#0a0b0d]" />;
  }

  // ── Maintenance: Kanban board ──
  if (m === "maintenance") {
    return (
      <div className="flex h-full flex-col bg-[#0a0b0d]">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <div className="h-3.5 w-3.5 rounded-md flex items-center justify-center" style={{ backgroundColor: `${accent}20` }}>
              <Wrench className="h-2 w-2" style={{ color: accent }} />
            </div>
            <div className="text-[10px] font-bold text-white">Maintenance</div>
          </div>
          <div className="rounded-full px-2 py-0.5 text-[7px] font-medium text-white/60 bg-white/[0.06]">12 open</div>
        </div>
        <div className="flex flex-1 gap-2 p-3">
          {[
            { col: "Open", color: "#fbbf24", count: 5 },
            { col: "Active", color: accent, count: 4 },
            { col: "Done", color: "#4ade80", count: 3 },
          ].map((c) => (
            <div key={c.col} className="flex-1 rounded-xl bg-white/[0.02] p-2">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c.color }} />
                  <div className="text-[7px] font-bold uppercase tracking-wider text-white/50">{c.col}</div>
                </div>
                <div className="text-[6px] text-white/30">{c.count}</div>
              </div>
              <div className="space-y-1.5">
                {[1,2].map((n) => (
                  <div key={n} className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-1.5">
                    <div className="mb-1 flex items-center gap-1">
                      <div className="rounded px-1 py-0.5 text-[5px] font-bold" style={{ backgroundColor: `${c.color}20`, color: c.color }}>
                        {c.col === "Open" ? "HIGH" : c.col === "Active" ? "MED" : "DONE"}
                      </div>
                      <div className="text-[5px] text-white/40">WO-0{n + 10}</div>
                    </div>
                    <div className="h-1 w-full rounded bg-white/15" />
                    <div className="mt-0.5 h-1 w-2/3 rounded bg-white/10" />
                    <div className="mt-1 flex items-center gap-1">
                      <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                      <div className="text-[5px] text-white/30">Mike R.</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Logistics: live map + tracking ──
  if (m === "logistics") {
    return (
      <div className="flex h-full flex-col bg-[#0a0b0d]">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <div className="h-3.5 w-3.5 rounded-md flex items-center justify-center" style={{ backgroundColor: `${accent}20` }}>
              <Truck className="h-2 w-2" style={{ color: accent }} />
            </div>
            <div className="text-[10px] font-bold text-white">Live Fleet</div>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            <div className="text-[7px] text-white/50">12 active</div>
          </div>
        </div>
        {/* Map */}
        <div className="relative flex-1 overflow-hidden">
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          {/* Route */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 150" preserveAspectRatio="none">
            <path d="M 30 120 Q 120 30 270 45" stroke={accent} strokeWidth="2" fill="none" strokeDasharray="4 3" opacity="0.7" />
            <path d="M 30 120 Q 80 80 150 70" stroke={accent} strokeWidth="2" fill="none" opacity="0.9" />
          </svg>
          {/* Pins */}
          <div className="absolute left-[8%] bottom-[18%]">
            <div className="h-3 w-3 rounded-full border-2 border-white" style={{ backgroundColor: accent, boxShadow: `0 0 12px ${accent}` }} />
            <div className="mt-0.5 text-[6px] font-bold text-white">Dallas</div>
          </div>
          <div className="absolute right-[8%] top-[28%]">
            <div className="h-3 w-3 rounded-full border-2 border-white bg-white" style={{ boxShadow: "0 0 12px white" }} />
            <div className="mt-0.5 text-[6px] font-bold text-white">Houston</div>
          </div>
          {/* Tracking card */}
          <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/[0.1] bg-[#131417] p-2.5" style={{ boxShadow: `0 8px 30px ${accent}15` }}>
            <div className="flex items-center justify-between mb-1">
              <div className="text-[8px] font-bold text-white">SH-88210</div>
              <div className="rounded-full px-2 py-0.5 text-[6px] font-bold" style={{ backgroundColor: `${accent}25`, color: accent }}>IN TRANSIT</div>
            </div>
            <div className="text-[7px] text-white/50">Dallas → Houston · ETA 2h 15m</div>
            <div className="mt-1.5 h-1 rounded-full bg-white/[0.08]">
              <div className="h-1 rounded-full" style={{ width: "65%", backgroundColor: accent }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Healthcare: patient portal ──
  if (m === "healthcare") {
    return (
      <div className="flex h-full flex-col bg-[#0a0b0d]">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <div className="h-3.5 w-3.5 rounded-md flex items-center justify-center" style={{ backgroundColor: `${accent}20` }}>
              <Heart className="h-2 w-2" style={{ color: accent }} />
            </div>
            <div className="text-[10px] font-bold text-white">Patient Portal</div>
          </div>
          <div className="h-4 w-4 rounded-full bg-white/[0.1]" />
        </div>
        <div className="flex flex-1 p-3 gap-2.5">
          {/* Left: appointments */}
          <div className="flex-1 space-y-2">
            <div className="text-[7px] font-bold uppercase tracking-wider text-white/40">Upcoming</div>
            {[
              { name: "Dr. Patel", dept: "Cardiology", time: "10:30 AM", type: "Video" },
              { name: "Dr. Lee", dept: "General", time: "2:00 PM", type: "In-person" },
              { name: "Dr. Kim", dept: "Dermatology", time: "4:15 PM", type: "Video" },
            ].map((a, i) => (
              <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-2 flex items-center gap-2">
                <div className="h-6 w-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${accent}15` }}>
                  <Heart className="h-3 w-3" style={{ color: accent }} />
                </div>
                <div className="flex-1">
                  <div className="text-[8px] font-bold text-white">{a.name}</div>
                  <div className="text-[6px] text-white/40">{a.dept}</div>
                </div>
                <div className="text-right">
                  <div className="text-[7px] font-medium" style={{ color: accent }}>{a.time}</div>
                  <div className="text-[5px] text-white/30">{a.type}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Right: vitals */}
          <div className="w-20 space-y-2">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-2 flex flex-col">
              <div className="mb-1 flex items-center gap-1">
                <Activity className="h-2 w-2" style={{ color: accent }} />
                <div className="text-[6px] font-bold uppercase text-white/40">Heart</div>
              </div>
              <div className="text-[12px] font-bold text-white">72</div>
              <div className="text-[5px] text-white/30">bpm</div>
              <div className="mt-1.5 flex items-end gap-0.5" style={{ height: 20 }}>
                {[40,70,50,80,60,90,65,75].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: `linear-gradient(180deg, ${accent}, ${accent}40)` }} />
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-2">
              <div className="mb-1 text-[6px] font-bold uppercase text-white/40">Steps</div>
              <div className="text-[10px] font-bold text-white">8,491</div>
              <div className="mt-1 h-1 rounded-full bg-white/[0.08]">
                <div className="h-1 rounded-full" style={{ width: "85%", backgroundColor: accent }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div className="bg-[#0a0b0d]" />;
}

// ════════════════════════════════════════════════════════════
// HD BROWSER FRAME — premium card with rich shadows and gradients
// ════════════════════════════════════════════════════════════

function BrowserFrame({
  p,
  isActive,
  isMobile,
  onClick,
}: {
  p: Project;
  isActive: boolean;
  isMobile: boolean;
  onClick: () => void;
}) {
  const accent = p.uiColors.accent;
  const cardW = isMobile ? 300 : 460;
  const cardH = isMobile ? 480 : 600;
  const mockupH = isMobile ? 180 : 240;
  const titleSize = isMobile ? 15 : 18;
  const padX = isMobile ? 16 : 22;
  const padY = isMobile ? 14 : 20;

  return (
    <div
      onClick={onClick}
      className="overflow-hidden rounded-2xl border transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
      style={{
        width: cardW,
        height: cardH,
        borderRadius: 20,
        borderColor: isActive ? `${accent}30` : "rgba(255,255,255,0.08)",
        background: "#0a0b0d",
        boxShadow: isActive
          ? `0 40px 100px -20px ${accent}30, 0 0 0 1px ${accent}20, 0 0 60px ${accent}10`
          : `0 20px 60px -15px rgba(0,0,0,0.7)`,
        cursor: isActive ? "pointer" : "default",
      }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2.5 border-b border-white/[0.06] bg-[#131417] px-4 py-3">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <div className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 mx-3 flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-1.5">
          <div className="h-2.5 w-2.5 rounded-full flex items-center justify-center" style={{ backgroundColor: `${accent}30` }}>
            <Lock className="h-1.5 w-1.5" style={{ color: accent }} />
          </div>
          <span className="text-[10px] font-medium text-white/40 truncate">
            sdhsystems.com/{p.slug}
          </span>
        </div>
        <div className="flex h-5 w-5 items-center justify-center rounded-md" style={{ backgroundColor: `${accent}20` }}>
          <Sparkles className="h-2.5 w-2.5" style={{ color: accent }} />
        </div>
      </div>

      {/* Website mockup */}
      <div className="relative overflow-hidden" style={{ height: mockupH }}>
        <WebsiteMockup p={p} accent={accent} />
        {/* Type badge */}
        <div
          className="absolute right-3 top-3 rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider backdrop-blur-md"
          style={{ borderColor: `${accent}30`, background: `${accent}15`, color: accent }}
        >
          {p.typeLabel}
        </div>
        {/* Bottom gradient fade into info section */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#0a0b0d] to-transparent" />
      </div>

      {/* Info section */}
      <div className="flex flex-col" style={{ padding: `${padY}px ${padX}px`, height: cardH - mockupH - 48 }}>
        {/* Title + tagline */}
        <h3 className="mb-1 font-bold leading-tight text-white" style={{ fontSize: titleSize }}>
          {p.title}
        </h3>
        <p className="mb-3.5 text-[12px] leading-relaxed text-white/45">
          {p.tagline}
        </p>

        {/* What we did */}
        <div className="mb-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <div className="mb-1.5 flex items-center gap-1.5">
            <CheckCircle className="h-3 w-3 text-white/40" />
            <span className="text-[9px] font-bold uppercase tracking-wider text-white/40">What we did</span>
          </div>
          <p className="text-[11px] leading-relaxed text-white/70">{p.whatWeDid}</p>
        </div>

        {/* How we enabled AI */}
        <div
          className="rounded-xl border p-3"
          style={{ borderColor: `${accent}20`, background: `${accent}08` }}
        >
          <div className="mb-1.5 flex items-center gap-1.5">
            <Brain className="h-3 w-3" style={{ color: accent }} />
            <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: accent }}>
              How we enabled AI
            </span>
          </div>
          <p className="text-[11px] leading-relaxed text-white/70">{p.aiNote}</p>
        </div>

        {/* Click hint */}
        {isActive && (
          <div className="mt-auto flex items-center justify-center gap-1 pt-3 text-[11px] font-medium" style={{ color: accent }}>
            Click to see full project
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProjectsShowcase() {
  const [index, setIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const isMobile = useIsMobile();
  const router = useRouter();

  const total = projects.length;

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (isHovering) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(next, isMobile ? 5500 : 5000);
    return () => clearInterval(timer);
  }, [isHovering, isMobile, next]);

  const active = projects[index];

  const stageH = isMobile ? 560 : 680;
  const neighborX = isMobile ? 100 : 170;
  const maxVisible = isMobile ? 1 : 2;
  const perspective = isMobile ? 1100 : 1500;

  return (
    <div
      className="relative mx-auto w-full max-w-[640px] overflow-visible"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Accent glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07] blur-[100px]"
        style={{ background: `radial-gradient(ellipse, ${active.uiColors.accent}, transparent 70%)` }}
      />

      {/* 3D Stage */}
      <div
        className="relative w-full"
        style={{ height: stageH, perspective: `${perspective}px` }}
      >
        {projects.map((p, i) => {
          const offset = i - index;
          const absOffset = Math.abs(offset);
          const isActive = i === index;

          const hidden = absOffset > maxVisible;
          const angle = offset * 16;
          const x = offset * neighborX;
          const z = isActive ? 80 : -60 - absOffset * 80;
          const scale = isActive
            ? 1
            : Math.max(isMobile ? 0.82 : 0.75, 1 - absOffset * 0.14);
          const opacity = isActive ? 1 : Math.max(0, 0.35 - absOffset * 0.16);

          return (
            <div
              key={p.slug}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none"
              aria-hidden={!isActive}
              style={{
                transform: `translateX(-50%) translateY(-50%) translateX(${x}px) translateZ(${z}px) rotateY(${-angle}deg) scale(${scale})`,
                opacity: hidden ? 0 : opacity,
                filter: isActive ? "none" : `blur(${absOffset * (isMobile ? 3 : 2)}px)`,
                transformStyle: "preserve-3d",
                zIndex: isActive ? 20 : 10 - absOffset,
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              <BrowserFrame
                p={p}
                isActive={isActive}
                isMobile={isMobile}
                onClick={() =>
                  isActive
                    ? router.push(`/projects/${p.slug}`)
                    : setIndex(i)
                }
              />
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="mt-3 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/5 text-[15px] text-canvas transition-all duration-200 hover:bg-white/10 hover:border-white/[0.15] focus:outline-none"
          aria-label="Previous"
        >
          ←
        </button>
        <div className="flex gap-1.5">
          {projects.map((p, i) => (
            <button
              key={p.slug}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                i === index
                  ? "w-6"
                  : "w-2 bg-white/20 hover:w-3 hover:bg-white/40"
              }`}
              style={i === index ? { backgroundColor: p.uiColors.accent } : {}}
              aria-label={p.title}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/5 text-[15px] text-canvas transition-all duration-200 hover:bg-white/10 hover:border-white/[0.15] focus:outline-none"
          aria-label="Next"
        >
          →
        </button>
      </div>

      {/* CTA */}
      <div className="mt-5 text-center">
        <button
          onClick={() => router.push(`/projects/${active.slug}`)}
          className="btn-wrapper group inline-flex items-center gap-2 rounded-full bg-canvas px-6 py-3 text-[14px] font-semibold text-jet transition-all hover:shadow-[0_0_40px_rgba(247,248,248,0.2)]"
        >
          Explore {active.title}
          <span className="btn-arrow">↗</span>
        </button>
      </div>
    </div>
  );
}
