"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-triggered reveal hook.
 * Adds `in-view` class when element enters viewport.
 * Usage: const ref = useReveal(); <div ref={ref} className="reveal">...</div>
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: { threshold?: number; rootMargin?: string; once?: boolean }
) {
  const ref = useRef<T>(null);
  const { threshold = 0.15, rootMargin = "0px 0px -80px 0px", once = true } = options || {};

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in-view");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("in-view");
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}
