/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#3B82F6',   // Xanh dương chính
        secondary: '#8B5CF6', // Tím phụ
      },
    },
  },
  plugins: [],
};