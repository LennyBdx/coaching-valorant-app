import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0b0e",
        surface: "#111318",
        surface2: "#16181f",
        border: "#1e2128",
        accent: "#e8ff47",
        red: "#ff4757",
        teal: "#4ecdc4",
        orange: "#ff9f43",
        purple: "#a29bfe",
        muted: "#5a5f72",
        text: "#e2e4ea",
      },
      fontFamily: {
        bebas: ["var(--font-bebas)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
        syne: ["var(--font-syne)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
