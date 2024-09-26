/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Adding custom height breakpoints for height-based responsiveness
      screens: {
        'h-md': { 'raw': '(min-height: 768px)' }, // Custom height media query for 768px height
        'h-lg': { 'raw': '(min-height: 1024px)' }, // Custom height media query for 1024px height
      },
      // Adding custom viewport height units
      height: {
        '10vh': '10vh',
        '25vh': '25vh',
        '50vh': '50vh',
        '75vh': '75vh',
        '90vh': '90vh',
      },
    },
  },
  plugins: [],
}
