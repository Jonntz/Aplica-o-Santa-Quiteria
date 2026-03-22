/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores baseadas no layout original do site Santa Quitéria
        paroquia: {
          primary: '#6b21a8', // Exemplo de um roxo litúrgico, vamos ajustar conforme o CSS original
          secondary: '#d8b4fe',
          dark: '#1f2937',
          light: '#f3f4f6'
        }
      }
    },
  },
  plugins: [],
}