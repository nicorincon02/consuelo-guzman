// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // colores de marca Consuelo Guzmán
        brandBeige: "#F5F1EC",
        brandSand:  "#E2D8CD",
        brandBrown: "#8A6D5B",
        brandDark:  "#4B3F36",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "floatDelayed 7s ease-in-out infinite 2s",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
