/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#A3B18A", // Organic Sage
        "background-light": "#FFF9F0", // Cream
        "background-dark": "#2C3632", // Charcoal

        // Organic Calm Palette
        "organic": {
          "bg": "#FFF9F0", // Cream
          "surface": "#FFFFFF", // White
          "primary": "#A3B18A", // Sage Green
          "secondary": "#F4A261", // Peach
          "accent": "#E9C46A", // Sunny Yellow
          "text": "#2C3632", // Dark Charcoal
          "muted": "#5C6B5E", // Sage Grey
          "highlight": "#FFE8D6", // Pale Peach
        },
      },
      fontFamily: {
        "display": ["System", "serif"], // Using system serif for headers
        "body": ["Inter_400Regular", "System"],
        "lexend": ["Lexend_400Regular", "System"]
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'medium': '0 8px 30px rgba(0, 0, 0, 0.08)',
        'float': '0 12px 40px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: { "DEFAULT": "0.5rem", "xl": "1rem", "2xl": "1.5rem", "3xl": "2rem", "full": "9999px" },
    },
  },
  plugins: [],
}
