/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    colors: {
      white: "#FFFFFF",
      black: {
        100:"#000000",
        200: "#131313",
        300: "#212121"
      },
      gray: {
        DEFAULT: "#F0F0F0",
        200: "#999999",
        100: "#f5f5f5"
      },
      red: {
        DEFAULT: "#f21d2f",
        100: "#bf303c",
      },
      blue: {
        DEFAULT: "#048abf",
        100: "#0477bf",
        200: "#dfebf2",
        300: "#59b5d9"
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
}
