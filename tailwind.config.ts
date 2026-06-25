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
        "deep-sea": "#071628",
        "ocean-navy": "#0B1F3A",
        "horizon-blue": "#1A4A7A",
        "mid-sea": "#2A6FAB",
        seafoam: "#5AAFCB",
        pearl: "#F4F0E8",
        champagne: "#E8D5A3",
        gold: {
          DEFAULT: "#C9A84C",
          light: "#E8D5A3",
          dark: "#A8864A",
        },
        "neera-gold": "#C9A84C",
        "neera-gold-dark": "#A8864A",
        luxury: {
          black: "#071628",
          charcoal: "#0B1F3A",
          slate: "#2A2A2A",
        },
      },
      fontFamily: {
        displayAr: ["var(--font-reem-kufi)", "serif"],
        bodyAr: ["var(--font-ibm-plex-arabic)", "sans-serif"],
        displayEn: ["var(--font-cormorant)", "serif"],
        bodyEn: ["var(--font-jost)", "sans-serif"],
        scriptEn: ["var(--font-great-vibes)", "cursive"],
        tajawal: ["var(--font-tajawal)", "sans-serif"],
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
