import { z } from 'zod';

export const liturgyQuerySchema = z.object({
  query: z.object({
    dia: z.string().regex(/^\d{2}$/, 'O dia deve ter 2 dígitos (ex: 01, 21)').optional(),
    mes: z.string().regex(/^\d{2}$/, 'O mês deve ter 2 dígitos (ex: 03, 12)').optional(),
    ano: z.string().regex(/^\d{4}$/, 'O ano deve ter 4 dígitos (ex: 2024)').optional(),
  }),
});