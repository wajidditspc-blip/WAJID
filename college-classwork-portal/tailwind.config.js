/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef4ff',
          100: '#e0ebff',
          200: '#c7d9fe',
          300: '#a5c0fc',
          400: '#7c9ef8',
          500: '#5476f1',
          600: '#3452e5',
          700: '#253dcd',
          800: '#1e32a4',
          900: '#0f172a', // Navy / Deep Blue
          primary: '#1e40af', // Royal Blue
          secondary: '#0f172a', // Navy Blue
          accent: '#0284c7' // Bright Blue
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
