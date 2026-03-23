/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paroquia: {
          primary: '#7b0f14', // Vermelho principal
          dark: '#4a080b',    // Vermelho escuro
          gold: '#d4af37',    // Dourado
          light: '#f5f5f5',   // Texto claro
          card: 'rgba(0,0,0,0.75)',
        }
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}