import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string().url("A URL do banco de dados deve ser válida"),
  PORT: z.string().transform(Number).default("3000"),
  CORS_ORIGIN: z.string().transform((str) => str.split(',')),
  JWT_SECRET: z.string().min(10, "A chave JWT_SECRET deve ter no mínimo 10 caracteres"),
  JWT_REFRESH_SECRET: z.string().min(10, "A chave JWT_REFRESH_SECRET deve ter no mínimo 10 caracteres"),
  JWT_EXPIRES_IN: z.string().default("15m"),
  REFRESH_EXPIRES_IN: z.string().default("7d"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Configuração de variáveis de ambiente inválida:', _env.error.format());
  throw new Error('Variáveis de ambiente inválidas');
}

export const env = _env.data;