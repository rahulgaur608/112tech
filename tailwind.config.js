/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#13ecb6",
        "background-light": "#f6f8f8",
        "background-dark": "#10221d",
      },
      fontFamily: {
        "display": ["Inter_400Regular", "System"], // Fallback to System usually safer in RN until loaded
        "lexend": ["Lexend_400Regular", "System"]
      },
      borderRadius: { "DEFAULT": "0.5rem", "lg": "1rem", "xl": "1.5rem", "full": "9999px" },
    },
  },
  plugins: [],
}
