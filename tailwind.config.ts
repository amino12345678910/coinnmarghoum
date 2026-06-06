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
    },
  },
  plugins: [],
};
export default config;
