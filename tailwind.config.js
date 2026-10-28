/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        espresso: "#1C1613",
        cream: "#FBF8F3",
        paper: "#F4ECDF",
        terracotta: { DEFAULT: "#C85A32", hover: "#B04B26" },
        gold: "#E0A96D",
        muted: "#6E6259",
      },
      fontFamily: {
        serif: ["Fraunces", "serif"],
        sans: ["Outfit", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      keyframes: {
       spinSlow: { to: { transform: "rotate(360deg)" } },
    ember: {
      "0%,100%": { transform: "scale(1)", opacity: "0.55" },
      "50%": { transform: "scale(1.12)", opacity: "0.8" },
    },
    marquee: { to: { transform: "translateX(-50%)" } },
      },
      animation: {
    spinSlow: "spinSlow 24s linear infinite",
    ember: "ember 6s ease-in-out infinite",
    marquee: "marquee 60s linear infinite",
  },
    },
  },
  plugins: [],
};