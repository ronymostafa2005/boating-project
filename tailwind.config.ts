import type { Config } from "tailwindcss";
import tailwindcssRtl from "tailwindcss-rtl";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: {
          DEFAULT: "#D4A017",
          light: "#E8C547",
          dark: "#B8860B",
        },
        "neera-gold": "#C4A265",
        "neera-gold-dark": "#A8864A",
        luxury: {
          black: "#0A0A0A",
          charcoal: "#1A1A1A",
          slate: "#2A2A2A",
        },
      },
      fontFamily: {
        displayAr: ["var(--font-reem-kufi)", "serif"],
        bodyAr: ["var(--font-ibm-plex-arabic)", "sans-serif"],
        displayEn: ["var(--font-cormorant)", "serif"],
        bodyEn: ["var(--font-jost)", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [tailwindcssRtl],
};

export default config;
