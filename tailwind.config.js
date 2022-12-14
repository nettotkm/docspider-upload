/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      gray: {
        DEFAULT: "#F0F0F0",
        low: "#999999"
        
      },
      red: {
        DEFAULT: "#f21d2f"
      },
      blue: {
        DEFAULT: "#048abf"
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
}
