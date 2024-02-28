import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          100: "#D5FED5",
          200: "#B0EFB0",
          300: "#84F284",
          400: "#3AC23A",
          500: "#4B8E4B",
          600: "#338133",
          700: "#1D6D1D",
          800: "#0D4B0D",
          1000: "#D5FED5",
        },
        gray: {
          100: "#fafafa",
          200: "#f7f7f7",
          300: '#9F9F9F'
        },
        secondary: "#3498DB",
        dark: {
          500: "#343434",
        },
        boxShadow: {
          'testt': '0 0 0 apx rgba(225,29,72,0.3 )',
        }
      },
    },
  },
  plugins: [],
};
export default config;
