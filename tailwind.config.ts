import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-rubik)", ...fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: "hsl(238, 40%, 52%)",
          "300": "hsl(239, 57%, 85%)",
          "100": "hsl(239, 30%, 95%)",
        },
        danger: {
          DEFAULT: "hsl(358, 79%, 66%)",
          "300": "hsl(357, 100%, 86%)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
