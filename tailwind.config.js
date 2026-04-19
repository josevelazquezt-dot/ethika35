/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",   // Escanea todo el App Router
    "./pages/**/*.{js,ts,jsx,tsx}", // Soporte heredado (opcional)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
