import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        scala: {
          500: "#10B981", // Emerald 500 (Verde Growth)
          900: "#020617", // Slate 950 (Fundo Dark)
          800: "#0F172A", // Slate 900 (Cards)
        }
      }
    },
  },
  plugins: [],
};
export default config;