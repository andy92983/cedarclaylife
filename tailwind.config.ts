import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cedar: {
          50: "#F4F0E8",
          100: "#E8DFD0",
          200: "#DDD0BE",
          300: "#C9AD8A",
          400: "#B08860",
          500: "#966B45",
          600: "#7A5538",
          700: "#5E402C",
          800: "#432E20",
          900: "#2A1C14",
        },
        clay: {
          50: "#F6EDE6",
          100: "#F0E0D4",
          200: "#E5C9B4",
          300: "#D9A888",
          400: "#CF8468",
          500: "#B86A50",
          600: "#9A5540",
          700: "#7A4233",
        },
        sage: {
          50: "#EFF2E9",
          100: "#DEE6D4",
          200: "#C5D4B8",
          300: "#A3B593",
          400: "#7F9670",
          500: "#637A56",
          600: "#4E6144",
          700: "#3D4C36",
        },
        /** Matches Logos/Logo.png background so the header logo blends seamlessly */
        cream: "#F2EDE3",
        bark: "#2E2219",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grain":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
        "hero-gradient":
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(150, 107, 69, 0.1) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 20%, rgba(127, 150, 112, 0.06) 0%, transparent 50%)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out forwards",
        "fade-in": "fadeIn 1s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
