import axios from 'axios';

export const api = axios.create({
  // Aponta para o backend rodando na porta 3000
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});