import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030712", // Obsidian Black
        card: "#0B1117", // Card Surface
        primary: "#38BDF8", // Electric Cyan
        secondary: "#818CF8", // Indigo
        border: "#1F2937", // Border color
        muted: "#94A3B8",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        'glow': '0 0 10px rgba(56, 189, 248, 0.5)',
      }
    },
  },
  plugins: [],
};
export default config;
