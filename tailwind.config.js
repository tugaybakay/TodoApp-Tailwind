/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      darkMode: 'class',
      colors: {
        'customBackgroundColor': 'rgb(30,41,59) ',
        'containerBackgroundColor': 'rgb(51,65,85)'
      }
    },
  },
  plugins: [],
}
