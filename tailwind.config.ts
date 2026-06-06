import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: "var(--terracotta)",
        "deep-blue": "var(--deep-blue)",
        cream: "var(--cream)",
        olive: "var(--olive)",
        brass: "var(--brass)",
        charcoal: "var(--charcoal)",
      },
      fontFamily: {
        heading: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "paper-grain": "url('/images/paper-grain.png')",
        "margoum-pattern": "var(--margoum-pattern)",
      },
      keyframes: {
        "scroll-thread": {
          "0%": { transform: "scaleY(0)", transformOrigin: "top" },
          "50%": { transform: "scaleY(1)", transformOrigin: "top" },
          "50.1%": { transform: "scaleY(1)", transformOrigin: "bottom" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom" },
        },
      },
      animation: {
        "scroll-thread": "scroll-thread 2.5s cubic-bezier(0.77, 0, 0.175, 1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
