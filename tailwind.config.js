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
        opensans: ["OpenSans"],
        joystix: ["Joystix Proportional"],
        sans: ["Joystix Proportional", "sans-serif"],
      },
      letterSpacing: {
        widest: ".25em",
      },
      animation: {
        pulse2: "pulse 0.8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        blurIn: "blurInImage 500s ease-in-out",
      },
      keyframes: {
        pulse2: {
          "50%": {
            opacity: 0.5,
          },
        },
        blurInImage: {
          "0%": { filter: "blur(0)" },
          "100%": { filter: "blur(18px)" },
        },
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

/*


@keyframes pulse {
    50% {
        opacity: .5;
    }
}
.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

  animation: {
        fadeInSlow: "fadeIn 2.0s ease-in-out",
        fadeIn: "fadeIn 500ms ease-in-out",
        blurIn: "blurIn 500s ease-in-out",
      },
      keyframes: {
        blurIn: {
          "0%": { filter: "blur(0)", backdropFilter: "blur(0" },
          "100%": { filter: "blur(18px)", backdropFilter: "blur(18px)" },
        },
        fadeInSlow: {
          "0%": { opacity: "0" },
          "40%": { opacity: "0" },
          "60%": { opacity: "1" },
          "100%": { opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
*/
