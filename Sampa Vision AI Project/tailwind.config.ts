import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design system — Brutalismo Tecnológico
        void:     "#0A0A0F",
        pit:      "#0E0E16",
        well:     "#121218",
        cave:     "#181826",
        stone:    "#242436",
        ash:      "#6B6B8A",
        fog:      "#9090AA",
        ghost:    "#C4C4D8",
        bone:     "#E4E4F0",
        // Brand
        electric: {
          DEFAULT: "#5B6EFF",
          hover:   "#7B8EFF",
          dim:     "#3B4EDF",
          glow:    "rgba(91,110,255,0.16)",
        },
        border: {
          DEFAULT: "rgba(150,150,220,0.10)",
          hover:   "rgba(91,110,255,0.28)",
        },
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body:    ["var(--font-inter)", "sans-serif"],
        mono:    ["var(--font-jetbrains)", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
        "hero": ["clamp(3rem,7vw,6.5rem)", { lineHeight: "0.92", letterSpacing: "-0.025em" }],
        "display": ["clamp(2rem,4vw,3.2rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      spacing: {
        "section": "10rem",
        "section-sm": "6rem",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(150,150,220,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(150,150,220,0.08) 1px,transparent 1px)",
        "glow-radial":
          "radial-gradient(ellipse 80% 60% at 50% 0%,rgba(91,110,255,0.12) 0%,transparent 70%)",
        "electric-gradient":
          "linear-gradient(135deg,#5B6EFF 0%,#7B8EFF 100%)",
      },
      backgroundSize: {
        "grid": "56px 56px",
      },
      animation: {
        "fade-up":    "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        "slide-up":   "slide-up 0.9s cubic-bezier(0.16,1,0.3,1) forwards",
        "pulse-dot":  "pulse-dot 2s ease-in-out infinite",
        "ticker":     "ticker 28s linear infinite",
        "line-run":   "line-run 1.7s ease-in-out infinite",
        "orb-drift":  "orb-drift 9s ease-in-out infinite alternate",
        "orb-drift2": "orb-drift 13s ease-in-out 3s infinite alternate-reverse",
        "blink":      "blink 1.2s step-end infinite",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { transform: "translateY(110%)" },
          to:   { transform: "translateY(0)" },
        },
        "pulse-dot": {
          "0%,100%": { opacity: "1" },
          "50%":     { opacity: "0.3" },
        },
        "ticker": {
          to: { transform: "translateX(-50%)" },
        },
        "line-run": {
          "0%":   { left: "-100%" },
          "100%": { left: "100%" },
        },
        "orb-drift": {
          from: { transform: "translate(0,0) scale(1)" },
          to:   { transform: "translate(40px,-30px) scale(1.08)" },
        },
        "blink": {
          "0%,100%": { opacity: "1" },
          "50%":     { opacity: "0" },
        },
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.16,1,0.3,1)",
      },
    },
  },
  plugins: [],
};

export default config;
