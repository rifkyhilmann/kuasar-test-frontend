/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        backgroundImage: {
          'gradient-custom': 'linear-gradient(90deg, #7540EA, #AF36F4)',
          'gradient-custom-hover': 'linear-gradient(90deg, #6233D1, #951BCC)',
        },
      }
    },
  },
  plugins: [],
}

