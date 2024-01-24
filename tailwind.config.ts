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
          300: "#D5FED5",
          400: "#3AC23A",
          500: "#D5FED5",
          600: "#D5FED5",
          700: "#D5FED5",
          800: "#D5FED5",
          900: "#D5FED5",
          1000: "#D5FED5",
        },
        gray: {
          100: "#fafafa",
          200: "#f7f7f7",
        },
        secondary: "#3498DB",
        dark : {
          500 : '#343434'
        }
      },
    },
  },
  plugins: [],
};
export default config;
