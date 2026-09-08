import Logo from "./Logo";

const footerServices = [
  "Software Development",
  "Web & Mobile Apps",
  "AI & Automation",
  "ERP & CRM",
  "Workday",
  "Staffing",
];

const footerLinks = [
  { label: "Work", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] px-6 pt-20 pb-10 lg:px-8">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-32 w-[600px] -translate-x-1/2 rounded-full opacity-[0.04] blur-[120px]"
        style={{ background: "radial-gradient(ellipse, #4ade80, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-content">
        {/* Top: big CTA line */}
        <div className="mb-16 flex flex-col items-start justify-between gap-8 border-b border-white/[0.06] pb-16 lg:flex-row lg:items-end">
          <div>
            <Logo color="canvas" />
            <p className="mt-6 max-w-md text-body-s text-steel-2 leading-relaxed">
              SDH Systems is a staffing and technology-services company. We
              build software, deploy AI, and ship SOW projects from a 300-person
              team across India and the USA.
            </p>
          </div>
          <a
            href="#contact"
            className="btn-wrapper group inline-flex items-center gap-2 rounded-full bg-canvas px-6 py-3 text-body-s font-semibold text-jet transition-all hover:shadow-[0_0_30px_rgba(247,248,248,0.2)]"
          >
            Start a project
            <span className="btn-arrow">↗</span>
          </a>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 gap-12 lg:grid-cols-4">
          <div>
            <h4 className="mb-5 text-tiny font-medium uppercase tracking-[0.2em] text-steel">
              Services
            </h4>
            <ul className="space-y-3">
              {footerServices.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-small text-steel-2 transition-colors hover:text-canvas"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-tiny font-medium uppercase tracking-[0.2em] text-steel">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-small text-steel-2 transition-colors hover:text-canvas"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-tiny font-medium uppercase tracking-[0.2em] text-steel">
              Reach us
            </h4>
            <div className="space-y-3 text-small text-steel-2">
              <div>
                <p className="font-medium text-canvas">SDH Systems LLC</p>
                <p>14 Inverness Dr E, H-220</p>
                <p>Englewood, CO 80112</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-tiny font-medium uppercase tracking-[0.2em] text-steel">
              Contact
            </h4>
            <div className="space-y-3 text-small text-steel-2">
              <a
                href="mailto:info@sdhsystems.com"
                className="block transition-colors hover:text-canvas"
              >
                info@sdhsystems.com
              </a>
              <a
                href="tel:8129634734"
                className="block transition-colors hover:text-canvas"
              >
                812-963-4SDH
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-tiny text-steel">
            © {new Date().getFullYear()} SDH Systems. All rights reserved.
          </p>
          <a
            href="#home"
            className="text-tiny text-steel transition-colors hover:text-canvas"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
