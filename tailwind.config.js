/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#171717",
        muted: "#5B6472",
        canvas: "#FAFAF9",
        hairline: "#E4E4E7",
        indigo: {
          DEFAULT: "#4F46E5",
          soft: "#EEF0FD",
        },
        emerald: {
          DEFAULT: "#10B981",
          soft: "#E9FBF3",
        },
      },
      fontFamily: {
        display: ["Geist", "Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glass: "0 1px 1px rgba(23,23,23,0.03), 0 8px 24px rgba(23,23,23,0.06)",
        "glass-lg": "0 4px 8px rgba(23,23,23,0.04), 0 24px 48px rgba(23,23,23,0.10)",
      },
      keyframes: {
        "count-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.03)" },
        },
        "spark-out": {
          "0%": { transform: "translate(0,0) scale(1)", opacity: "1" },
          "100%": { transform: "translate(var(--tx), var(--ty)) scale(0)", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        spark: "spark-out 0.7s ease-out forwards",
        marquee: "marquee 22s linear infinite",
      },
    },
  },
  plugins: [],
};
