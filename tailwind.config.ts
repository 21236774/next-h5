import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'dark-18': '#181818',
        'tag-bg': 'hsla(0, 0%, 100%, 0.12)',
        'tag-text': 'hsla(0, 0%, 100%, 0.46)',
        'title': 'hsla(0, 0%, 100%, 0.8)'
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
