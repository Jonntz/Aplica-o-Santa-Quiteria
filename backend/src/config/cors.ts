import cors from 'cors';
import { env } from './env';

export const corsConfig = cors({
  origin: env.CORS_ORIGIN,
  credentials: true, // Necessário para enviar cookies httpOnly
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});