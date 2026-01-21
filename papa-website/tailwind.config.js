/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This line must cover your .tsx files!
  ],
  theme: {
    extend: {
      colors: {
        // Applying the brand colors from Daniel's business card
        'brand-maroon': '#4a0404', 
        'brand-gold': '#c5a021',
      },
    },
  },
  plugins: [],
}