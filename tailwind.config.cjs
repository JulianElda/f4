/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./node_modules/@julianelda/scratchpad/dist/scratchpad.js",
  ],
  theme: {
    fontFamily: {
      serif: "'Heliotrope 3'",
      mono: "'Heliotrope 3'",
      heading: "'Heliotrope 4'",
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/forms")],
};
