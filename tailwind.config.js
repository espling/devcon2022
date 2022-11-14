/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'

  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        joystix: ["Joystix Proportional"],
        sans: ["Joystix Proportional", "sans-serif"],
      },
      letterSpacing: {
        widest: ".25em",
      },
    },
  },
  variants: {
    extend: {
      fontFamily: ["hover", "focus"],
    },
  },
  plugins: [],
};
