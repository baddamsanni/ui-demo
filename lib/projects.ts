export type PillIcon =
  | "brain"
  | "bookOpen"
  | "users"
  | "messageSquare"
  | "shield"
  | "fileText"
  | "zap"
  | "mail"
  | "search"
  | "penTool"
  | "plug"
  | "barChart"
  | "target"
  | "calendar"
  | "star"
  | "refreshCw"
  | "shoppingBag"
  | "creditCard"
  | "truck"
  | "package"
  | "wrench"
  | "clipboard"
  | "heart"
  | "stethoscope"
  | "building"
  | "globe"
  | "smartphone"
  | "database"
  | "cloud"
  | "lock"
  | "trendingUp"
  | "bell"
  | "mapPin";

export type ProjectType = "ai-agent" | "web-app" | "mobile-app" | "platform";

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  brief: string;
  description: string;
  gradient: string;
  bgClass: string;
  orbClass: string;
  chipClass: string;
  icon: string;
  type: ProjectType;
  typeLabel: string;
  features: string[];
  prompt: string;
  pills: { icon: PillIcon; text: string }[];
  uiColors: { bg: string; card: string; text: string; accent: string };
  chat?: { sender: string; message: string; agent?: boolean }[];
  mockup: "chat" | "dashboard" | "storefront" | "maintenance" | "logistics" | "healthcare";
  whatWeDid: string;
  aiNote: string;
  response: {
    text: string;
    card: {
      type: "order-status" | "approval" | "candidate" | "products" | "revenue" | "spending" | "ticket" | "tracking" | "appointment";
      rows: { left: string; right?: string; rightColor?: "accent" | "green" | "red" | "muted" }[];
      pill?: { text: string; color: "accent" | "amber" | "green" | "red" };
      sparkline?: boolean;
    };
  };
}

export const projects: Project[] = [
  // ── AI AGENTS ──
  {
    slug: "ai-chatbots",
    title: "Customer-Facing Chat Agent",
    tagline: "Conversational agents that talk like humans",
    brief:
      "Intelligent chatbots powered by large language models. They understand context, remember history, and resolve customer questions 24/7 without writing a single rule.",
    description:
      "Modern AI chatbots are not the rigid decision-tree bots of the past. They use retrieval-augmented generation (RAG), long conversation memory, and function calling to answer questions, look up data, and hand off to humans only when needed. In a modern UI they appear as floating message threads, clean avatars, typing indicators, and suggested actions — minimal, warm, and fast.",
    gradient: "from-amber-500 via-orange-600 to-rose-700",
    bgClass: "bg-gradient-to-br from-amber-950/80 via-orange-950/80 to-rose-950/80",
    orbClass: "bg-gradient-to-br from-amber-300 to-orange-500",
    chipClass: "border-amber-500/30 bg-amber-500/10 text-amber-200",
    icon: "💬",
    type: "ai-agent",
    typeLabel: "AI Agent",
    features: [
      "Multi-turn context memory",
      "RAG over your knowledge base",
      "Human handoff with full history",
      "Voice + text in one thread",
    ],
    prompt: "Track my order #48291...",
    pills: [
      { icon: "brain", text: "Context memory" },
      { icon: "bookOpen", text: "RAG answers" },
      { icon: "users", text: "Human handoff" },
    ],
    uiColors: { bg: "#0a0a0a", card: "#111827", text: "#e5e7eb", accent: "#f97316" },
    chat: [
      { sender: "Customer", message: "Where is my refund?", agent: false },
      { sender: "AI Agent", message: "I found order #48291. A refund of $129 was issued on May 12 and will arrive in 2-3 business days.", agent: true },
      { sender: "Customer", message: "Thanks!", agent: false },
    ],
    mockup: "chat",
    whatWeDid: "Built a full-screen chat agent UI with conversation history, typing indicators, and inline order cards.",
    aiNote: "RAG over order/customer DBs. Tuned LLM with support transcripts to match brand tone.",
    response: {
      text: "I found order #48291. Refund of $129 issued May 12.",
      card: {
        type: "order-status",
        rows: [
          { left: "Order #48291" },
          { left: "ETA: 2-3 business days", rightColor: "muted" },
        ],
        pill: { text: "Refunded", color: "accent" },
      },
    },
  },
  {
    slug: "enterprise-knowledge-agent",
    title: "Enterprise Knowledge Agent",
    tagline: "Company-wide answers from your documents",
    brief:
      "An internal knowledge agent that reads policy docs, wikis, and tickets to give employees instant, cited answers inside Slack, Teams, or email.",
    description:
      "Enterprise knowledge agents connect to your existing tools — HRIS, CRM, ERP, docs — and act as always-on teammates. Employees ask in plain English, and the agent reads the right data, follows approval chains, and produces the output. The UI is a command palette-style interface with cards, quick actions, and clear citations.",
    gradient: "from-violet-500 via-fuchsia-600 to-rose-700",
    bgClass: "bg-gradient-to-br from-violet-950/80 via-fuchsia-950/80 to-rose-950/80",
    orbClass: "bg-gradient-to-br from-violet-300 to-fuchsia-500",
    chipClass: "border-violet-500/30 bg-violet-500/10 text-violet-200",
    icon: "🏢",
    type: "ai-agent",
    typeLabel: "AI Agent",
    features: [
      "Slack / Teams integration",
      "Role-based access control",
      "Cited answers from policy docs",
      "Audit trail for every action",
    ],
    prompt: "What is the travel policy for India employees?",
    pills: [
      { icon: "messageSquare", text: "Slack / Teams" },
      { icon: "shield", text: "Role access" },
      { icon: "fileText", text: "Cited docs" },
    ],
    uiColors: { bg: "#0a0a0a", card: "#1e1b4b", text: "#e0e7ff", accent: "#a78bfa" },
    chat: [
      { sender: "Manager", message: "Approve the AWS budget increase?", agent: false },
      { sender: "AI Agent", message: "I routed it to Finance. Sam approved. Pending final sign-off from VP Engineering.", agent: true },
    ],
    mockup: "chat",
    whatWeDid: "Built a command-palette UI inside Slack/Teams with cited answers, approval chains, and audit logs.",
    aiNote: "Connected LLM to HRIS, CRM, and policy docs. Role-based access controls on every query.",
    response: {
      text: "Routed to Finance. Sam approved. Pending VP sign-off.",
      card: {
        type: "approval",
        rows: [
          { left: "AWS Budget Increase", right: "$12,000", rightColor: "muted" },
          { left: "Approved by Sam · Pending VP", rightColor: "muted" },
        ],
      },
    },
  },
  {
    slug: "ai-recruiting",
    title: "Recruiting Agent",
    tagline: "Screen, schedule, and engage candidates",
    brief:
      "A recruiting agent that matches résumés to job descriptions, screens candidates, and books interviews — built for staffing companies like SDH.",
    description:
      "For staffing firms, the recruiting agent is the hardest working sourcer. It reads résumés, scores fit, sends personalized outreach, and coordinates calendars. Recruiters review a shortlist instead of digging through inboxes. The UI shows candidate cards with match scores, skill tags, and interview slots.",
    gradient: "from-emerald-500 via-teal-600 to-cyan-700",
    bgClass: "bg-gradient-to-br from-emerald-950/80 via-teal-950/80 to-cyan-950/80",
    orbClass: "bg-gradient-to-br from-emerald-300 to-teal-500",
    chipClass: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
    icon: "�",
    type: "ai-agent",
    typeLabel: "AI Agent",
    features: [
      "Résumé-to-job matching",
      "Automated candidate outreach",
      "Interview scheduling across timezones",
      "Pipeline analytics",
    ],
    prompt: "Find senior React developers in Austin...",
    pills: [
      { icon: "target", text: "Résumé match" },
      { icon: "mail", text: "Outreach" },
      { icon: "calendar", text: "Scheduling" },
    ],
    uiColors: { bg: "#0a0a0a", card: "#064e3b", text: "#d1fae5", accent: "#4ade80" },
    chat: [
      { sender: "Recruiter", message: "Find a Workday developer in Texas", agent: false },
      { sender: "AI Agent", message: "Found 8 candidates. Top 3 have Workday certification and cleared availability this week.", agent: true },
    ],
    mockup: "chat",
    whatWeDid: "Built a candidate pipeline dashboard with match scores, skill tags, and calendar integration.",
    aiNote: "Fine-tuned LLM on 10k resumes + job descriptions. Automated outreach with personalized emails.",
    response: {
      text: "Found 8 candidates. Top 3 have Workday certification.",
      card: {
        type: "candidate",
        rows: [
          { left: "3 Workday Certified", right: "94% match", rightColor: "accent" },
          { left: "Available this week", rightColor: "muted" },
        ],
      },
    },
  },

  // ── WEB & MOBILE APPS ──
  {
    slug: "retail-mobile-app",
    title: "Retail Mobile App",
    tagline: "Full-featured shopping apps for retailers",
    brief:
      "End-to-end mobile shopping apps with product catalogs, cart, checkout, loyalty programs, and push notifications — built for iOS and Android.",
    description:
      "We build complete retail mobile applications that let shop owners manage inventory, run promotions, and engage customers directly. Features include product browsing with high-res images, secure checkout with Stripe/Razorpay, order tracking, loyalty points, push notifications for deals, and an admin dashboard for the shop owner to manage everything from one place. The UI is designed for speed — large product images, one-tap add to cart, and seamless guest checkout.",
    gradient: "from-rose-500 via-pink-600 to-purple-700",
    bgClass: "bg-gradient-to-br from-rose-950/80 via-pink-950/80 to-purple-950/80",
    orbClass: "bg-gradient-to-br from-rose-300 to-pink-500",
    chipClass: "border-rose-500/30 bg-rose-500/10 text-rose-200",
    icon: "🛍️",
    type: "mobile-app",
    typeLabel: "Mobile App",
    features: [
      "Product catalog with high-res images",
      "Secure checkout (Stripe / Razorpay)",
      "Loyalty points & rewards",
      "Push notifications for deals",
      "Admin dashboard for shop owners",
      "Order tracking & history",
    ],
    prompt: "Search for wireless headphones...",
    pills: [
      { icon: "shoppingBag", text: "Catalog" },
      { icon: "creditCard", text: "Checkout" },
      { icon: "bell", text: "Push deals" },
    ],
    uiColors: { bg: "#0a0a0a", card: "#1c0a14", text: "#fce7f3", accent: "#f472b6" },
    mockup: "storefront",
    whatWeDid: "Built a full e-commerce website with product catalog, cart, checkout, and admin dashboard.",
    aiNote: "AI search with natural language queries. Product recommendations engine tuned on purchase history.",
    response: {
      text: "Here are 2 results for wireless headphones",
      card: {
        type: "products",
        rows: [
          { left: "Sony WH-1000XM5 · $329", right: "★ 4.8", rightColor: "accent" },
          { left: "Bose QC Ultra · $379", right: "★ 4.6", rightColor: "accent" },
        ],
      },
    },
  },
  {
    slug: "shop-owner-platform",
    title: "Shop Owner Platform",
    tagline: "Manage your store from one dashboard",
    brief:
      "A web platform for shop owners to manage inventory, orders, staff, and analytics — all from a single, clean admin dashboard.",
    description:
      "The Shop Owner Platform is a comprehensive web application that gives small and medium retail businesses a single pane of glass for their entire operation. Owners can add and edit products, track stock levels, view sales analytics in real time, manage staff permissions, process returns, and export financial reports. The dashboard uses a card-based layout with live charts, quick-action buttons, and a mobile-responsive design so owners can check their store from anywhere.",
    gradient: "from-blue-500 via-indigo-600 to-violet-700",
    bgClass: "bg-gradient-to-br from-blue-950/80 via-indigo-950/80 to-violet-950/80",
    orbClass: "bg-gradient-to-br from-blue-300 to-indigo-500",
    chipClass: "border-blue-500/30 bg-blue-500/10 text-blue-200",
    icon: "📊",
    type: "web-app",
    typeLabel: "Web App",
    features: [
      "Real-time inventory management",
      "Sales analytics & live charts",
      "Staff roles & permissions",
      "Order processing & returns",
      "Financial report exports",
      "Multi-store support",
    ],
    prompt: "Show today's sales summary...",
    pills: [
      { icon: "barChart", text: "Analytics" },
      { icon: "package", text: "Inventory" },
      { icon: "trendingUp", text: "Reports" },
    ],
    uiColors: { bg: "#0a0a0a", card: "#0c1628", text: "#dbeafe", accent: "#60a5fa" },
    mockup: "dashboard",
    whatWeDid: "Built a web admin dashboard with real-time inventory, sales charts, staff roles, and report exports.",
    aiNote: "AI demand forecasting tuned on 2 years of sales data. Auto-reorder alerts when stock drops.",
    response: {
      text: "Today's sales summary",
      card: {
        type: "revenue",
        rows: [
          { left: "Revenue today", right: "$48,291", rightColor: "muted" },
          { left: "+23% vs yesterday", rightColor: "green" },
        ],
        sparkline: true,
      },
    },
  },
  {
    slug: "company-maintenance-app",
    title: "Company Maintenance App",
    tagline: "Track logs, tickets, and equipment health",
    brief:
      "A full maintenance and log management application for companies to track equipment, raise work orders, schedule preventive maintenance, and audit everything.",
    description:
      "The Company Maintenance App is built for facilities teams, IT departments, and manufacturing floors that need to track every piece of equipment, log every issue, and schedule every repair. Features include QR-code equipment scanning, work order creation and assignment, preventive maintenance scheduling, spare parts inventory, audit trails with timestamps, and a dashboard showing open tickets by priority. The UI uses status chips (open/in-progress/resolved), priority color coding, and a Kanban-style ticket board.",
    gradient: "from-amber-500 via-yellow-600 to-orange-700",
    bgClass: "bg-gradient-to-br from-amber-950/80 via-yellow-950/80 to-orange-950/80",
    orbClass: "bg-gradient-to-br from-amber-300 to-yellow-500",
    chipClass: "border-amber-500/30 bg-amber-500/10 text-amber-200",
    icon: "🔧",
    type: "platform",
    typeLabel: "Platform",
    features: [
      "QR-code equipment scanning",
      "Work order creation & assignment",
      "Preventive maintenance scheduling",
      "Spare parts inventory tracking",
      "Full audit trail with timestamps",
      "Priority-based Kanban board",
    ],
    prompt: "Log a new maintenance ticket...",
    pills: [
      { icon: "wrench", text: "Work orders" },
      { icon: "clipboard", text: "Audit trail" },
      { icon: "bell", text: "Alerts" },
    ],
    uiColors: { bg: "#0a0a0a", card: "#1c1208", text: "#fef3c7", accent: "#fbbf24" },
    mockup: "maintenance",
    whatWeDid: "Built a Kanban-style maintenance ticket system with QR scanning, work orders, and audit trails.",
    aiNote: "AI predicts equipment failures from sensor logs. Auto-creates preventive maintenance tickets.",
    response: {
      text: "Ticket created — WO-0142",
      card: {
        type: "ticket",
        rows: [
          { left: "HVAC Unit 3" },
          { left: "Assigned to: Mike R.", right: "ETA: 2h", rightColor: "muted" },
        ],
        pill: { text: "High", color: "amber" },
      },
    },
  },
  {
    slug: "logistics-tracking",
    title: "Logistics & Tracking App",
    tagline: "Real-time fleet and shipment tracking",
    brief:
      "A logistics platform with live GPS tracking, route optimization, delivery confirmation, and driver mobile app — for shipping companies and distributors.",
    description:
      "We build end-to-end logistics systems that include a dispatcher web dashboard, a driver mobile app, and a customer tracking page. Dispatchers see a live map with all active shipments, can assign and reroute drivers, and get alerts for delays. Drivers use the mobile app for turn-by-turn navigation, proof-of-delivery photos, and electronic signatures. Customers get a tracking link with real-time ETA. The UI uses map overlays, status timelines, and delivery confirmation cards.",
    gradient: "from-cyan-500 via-sky-600 to-blue-700",
    bgClass: "bg-gradient-to-br from-cyan-950/80 via-sky-950/80 to-blue-950/80",
    orbClass: "bg-gradient-to-br from-cyan-300 to-sky-500",
    chipClass: "border-cyan-500/30 bg-cyan-500/10 text-cyan-200",
    icon: "🚚",
    type: "platform",
    typeLabel: "Platform",
    features: [
      "Live GPS fleet tracking",
      "Route optimization engine",
      "Proof-of-delivery photos & e-sign",
      "Customer tracking page with ETA",
      "Driver mobile app (iOS / Android)",
      "Dispatcher web dashboard",
    ],
    prompt: "Track shipment #SH-88210...",
    pills: [
      { icon: "truck", text: "Fleet tracking" },
      { icon: "mapPin", text: "Live ETA" },
      { icon: "package", text: "Proof of delivery" },
    ],
    uiColors: { bg: "#0a0a0a", card: "#082030", text: "#cffafe", accent: "#22d3ee" },
    mockup: "logistics",
    whatWeDid: "Built a logistics platform with live GPS map, driver mobile app, and customer tracking page.",
    aiNote: "AI route optimization tuned on traffic + delivery data. Predictive ETA with 94% accuracy.",
    response: {
      text: "Shipment #SH-88210 located",
      card: {
        type: "tracking",
        rows: [
          { left: "Dallas → Houston" },
          { left: "ETA: 2h 15m", rightColor: "accent" },
        ],
        pill: { text: "In transit", color: "accent" },
      },
    },
  },
  {
    slug: "healthcare-portal",
    title: "Healthcare Patient Portal",
    tagline: "Book appointments, view records, chat with doctors",
    brief:
      "A HIPAA-compliant patient portal web and mobile app for clinics — appointment booking, telehealth video, lab results, and prescription management.",
    description:
      "We build healthcare patient portals that connect clinics with their patients digitally. Patients can book appointments, join telehealth video calls, view lab results, request prescription refills, and message their care team securely. Doctors get a dashboard with patient timelines, appointment calendars, and digital notes. The UI is calm and accessible — large touch targets, high contrast, clear status badges, and a reassuring color palette. All data is encrypted and HIPAA-compliant.",
    gradient: "from-teal-500 via-emerald-600 to-green-700",
    bgClass: "bg-gradient-to-br from-teal-950/80 via-emerald-950/80 to-green-950/80",
    orbClass: "bg-gradient-to-br from-teal-300 to-emerald-500",
    chipClass: "border-teal-500/30 bg-teal-500/10 text-teal-200",
    icon: "🏥",
    type: "web-app",
    typeLabel: "Web + Mobile",
    features: [
      "Appointment booking & reminders",
      "Telehealth video consultations",
      "Lab results with trend charts",
      "Prescription refill requests",
      "Secure messaging with care team",
      "HIPAA-compliant encryption",
    ],
    prompt: "Book an appointment with Dr. Patel...",
    pills: [
      { icon: "heart", text: "Patient care" },
      { icon: "calendar", text: "Book visit" },
      { icon: "shield", text: "HIPAA secure" },
    ],
    uiColors: { bg: "#0a0a0a", card: "#04201a", text: "#d1fae5", accent: "#2dd4bf" },
    mockup: "healthcare",
    whatWeDid: "Built a HIPAA-compliant patient portal with appointment booking, telehealth video, and lab results.",
    aiNote: "AI symptom checker triages patients. NLP summarizes doctor notes into structured records.",
    response: {
      text: "Appointment booked",
      card: {
        type: "appointment",
        rows: [
          { left: "Dr. Patel — Cardiology" },
          { left: "Tomorrow, 10:30 AM", rightColor: "accent" },
        ],
        pill: { text: "Video visit", color: "accent" },
      },
    },
  },
  {
    slug: "fintech-dashboard",
    title: "Fintech Dashboard",
    tagline: "Banking, payments, and financial analytics",
    brief:
      "A financial technology platform with account dashboards, transaction history, budget analytics, and secure payment processing — for fintech startups and banks.",
    description:
      "We build fintech web and mobile applications that handle real money safely. Features include account dashboards with balance cards, transaction history with categorization, budget tracking with visual analytics, peer-to-peer payments, and integration with Plaid for bank connections. The UI uses data-dense charts, secure biometric login, real-time transaction notifications, and a clean, trustworthy design language. Every transaction is logged with an immutable audit trail.",
    gradient: "from-indigo-500 via-blue-600 to-cyan-700",
    bgClass: "bg-gradient-to-br from-indigo-950/80 via-blue-950/80 to-cyan-950/80",
    orbClass: "bg-gradient-to-br from-indigo-300 to-blue-500",
    chipClass: "border-indigo-500/30 bg-indigo-500/10 text-indigo-200",
    icon: "💳",
    type: "web-app",
    typeLabel: "Web App",
    features: [
      "Account dashboard with balance cards",
      "Transaction categorization & search",
      "Budget tracking with visual analytics",
      "Peer-to-peer payments",
      "Plaid bank integration",
      "Biometric login & audit trail",
    ],
    prompt: "Show my spending this month...",
    pills: [
      { icon: "creditCard", text: "Payments" },
      { icon: "trendingUp", text: "Analytics" },
      { icon: "lock", text: "Bank-grade security" },
    ],
    uiColors: { bg: "#0a0a0a", card: "#0a0f1c", text: "#e0e7ff", accent: "#818cf8" },
    mockup: "dashboard",
    whatWeDid: "Built a fintech dashboard with balance cards, transaction categorization, and P2P payments.",
    aiNote: "AI fraud detection tuned on transaction patterns. Auto-categorizes spending with 96% accuracy.",
    response: {
      text: "Spending this month",
      card: {
        type: "spending",
        rows: [
          { left: "Total spending", right: "$12,847", rightColor: "muted" },
          { left: "-8% vs last month", rightColor: "red" },
        ],
        sparkline: true,
      },
    },
  },
];
