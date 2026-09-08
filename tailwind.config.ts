import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        jet: "#08090a",
        "jet-2": "#0d0e10",
        "jet-3": "#131417",
        canvas: "#f7f8f8",
        slate: "#1a1b1e",
        steel: "#6b6f76",
        "steel-2": "#8a8f98",
        accent: "#4ade80",
        "accent-2": "#22d3ee",
        "accent-3": "#a78bfa",
        warm: "#f97316",
        "light-bg": "#0d0e10",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Instrument Serif", "Georgia", "serif"],
      },
      fontSize: {
        "hero-xl": ["80px", { lineHeight: "88px", letterSpacing: "-2px" }],
        "hero-l": ["56px", { lineHeight: "62px", letterSpacing: "-1.2px" }],
        "h1": ["44px", { lineHeight: "52px", letterSpacing: "-0.8px" }],
        "h2": ["32px", { lineHeight: "38px", letterSpacing: "-0.4px" }],
        "h3": ["24px", { lineHeight: "30px", letterSpacing: "-0.2px" }],
        "body-l": ["20px", { lineHeight: "140%" }],
        "body": ["17px", { lineHeight: "150%" }],
        "body-s": ["15px", { lineHeight: "150%" }],
        "small": ["13px", { lineHeight: "140%" }],
        "tiny": ["11px", { lineHeight: "130%" }],
      },
      borderRadius: {
        "6": "6px",
        "8": "8px",
        "12": "12px",
        "16": "16px",
        "20": "20px",
        "24": "24px",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
        "38": "9.5rem",
      },
      maxWidth: {
        "content": "1280px",
      },
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
