/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: { colors: { brand: { 50: '#f7f1f9', 100: '#eee2f1', 200: '#dfc8e5', 500: '#8a5b98', 600: '#754783', 700: '#60396c' } }, boxShadow: { soft: '0 8px 30px rgba(58, 36, 68, .07)' } } },
  plugins: [],
}
