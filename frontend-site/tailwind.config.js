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
          primary: '#7b0f14', // --vermelho-principal
          dark: '#4a080b',    // --vermelho-escuro
          gold: '#d4af37',    // --dourado
          light: '#f5f5f5',   // --texto-claro
          card: 'rgba(0,0,0,0.75)', // --fundo-card
        }
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'fade-out': 'fadeOut 2s ease forwards 2.5s',
        'zoom-in': 'zoomIn 2s ease',
      },
      keyframes: {
        fadeOut: {
          'to': { opacity: '0', visibility: 'hidden' },
        },
        zoomIn: {
          'from': { transform: 'scale(0.5)', opacity: '0' },
          'to': { transform: 'scale(1)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}