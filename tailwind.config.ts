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
        terracotta: "rgb(var(--terracotta-rgb) / <alpha-value>)",
        "deep-blue": "rgb(var(--deep-blue-rgb) / <alpha-value>)",
        cream: "rgb(var(--cream-rgb) / <alpha-value>)",
        olive: "rgb(var(--olive-rgb) / <alpha-value>)",
        brass: "rgb(var(--brass-rgb) / <alpha-value>)",
        charcoal: "rgb(var(--charcoal-rgb) / <alpha-value>)",
      },
      fontFamily: {
        heading: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "margoum-pattern": "var(--margoum-pattern)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "scroll-thread": {
          "0%": { transform: "scaleY(0)", transformOrigin: "top" },
          "50%": { transform: "scaleY(1)", transformOrigin: "top" },
          "50.1%": { transform: "scaleY(1)", transformOrigin: "bottom" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "scroll-thread": "scroll-thread 2.5s cubic-bezier(0.77, 0, 0.175, 1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
