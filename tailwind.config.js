/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#FFD700",
        "primary-hover": "#E5C100",
        "background-light": "#f8f8f6",
        "background-dark": "#000000",
        "surface-dark": "#111111",
        "text-light": "#e5e5e5",
        "text-dim": "#a3a3a3",
        "border-dark": "#333333",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px",
      },
    },
  },
  plugins: [],
}


