"use client";

import { useState, useEffect } from "react";
import Logo from "./Logo";
import { Sun, Moon } from "lucide-react";

const navLinks = [
  { label: "Work", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Load theme preference — default to light
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      document.documentElement.classList.remove("light");
      setIsLight(false);
    } else {
      document.documentElement.classList.add("light");
      setIsLight(true);
    }
  }, []);

  const toggleTheme = () => {
    const next = !isLight;
    setIsLight(next);
    if (next) {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  };

  // Lock body scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* Fixed banner — always visible */}
      <header
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ease-smooth ${
          scrolled
            ? "bg-jet/70 backdrop-blur-2xl border-b border-white/[0.04]"
            : "bg-jet/40 backdrop-blur-md border-b border-white/[0.02]"
        }`}
      >
        <nav className="relative z-10 mx-auto flex max-w-content items-center justify-between px-6 py-4 lg:px-8">
          <Logo color="canvas" />

          {/* CTA — always visible */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-canvas transition-all hover:border-white/[0.2] hover:bg-white/[0.05]"
              aria-label="Toggle theme"
            >
              {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>

            <a
              href="#contact"
              className="btn-wrapper group hidden items-center gap-2 rounded-full bg-canvas px-5 py-2.5 text-small font-semibold text-jet transition-all hover:shadow-[0_0_30px_rgba(247,248,248,0.2)] sm:inline-flex"
            >
              Start a project
              <span className="btn-arrow text-jet">↗</span>
            </a>

            {/* Hamburger — always visible, contains all nav links */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col gap-1.5 lg:hidden"
              aria-label="Menu"
            >
              <span
                className={`h-px w-6 bg-canvas transition-all duration-300 ${
                  menuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-6 bg-canvas transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-px w-6 bg-canvas transition-all duration-300 ${
                  menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </button>

            {/* Desktop: links inline (hidden on mobile/tablet) */}
            <div className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="nav-link rounded-full px-4 py-2 text-small text-canvas/70 font-medium transition-colors hover:text-canvas"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile/tablet menu overlay — all links in hamburger */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col bg-jet/98 backdrop-blur-2xl px-6 pt-24 lg:hidden">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-white/[0.04] py-6 text-h2 font-medium text-canvas transition-colors hover:text-accent"
              style={{
                animation: `fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s both`,
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-canvas px-6 py-3.5 text-body-s font-semibold text-jet"
          >
            Start a project ↗
          </a>
        </div>
      )}
    </>
  );
}
