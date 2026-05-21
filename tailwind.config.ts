import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#07172f",
          blue: "#0b6ee7",
          teal: "#14b8a6",
          violet: "#7c3aed",
          ink: "#111827"
        }
      },
      boxShadow: {
        soft: "0 18px 55px rgba(15, 23, 42, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
