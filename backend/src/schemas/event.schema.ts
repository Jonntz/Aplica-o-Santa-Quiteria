import { z } from 'zod';

export const createEventSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'O título deve ter no mínimo 3 caracteres'),
    description: z.string().min(10, 'A descrição deve ter no mínimo 10 caracteres'),
    date: z.string().datetime('A data deve ser um formato ISO válido (ex: 2024-12-25T10:00:00Z)'),
    imageUrl: z.string().url('A URL da imagem deve ser válida').optional().nullable(),
    category: z.string().optional().nullable(),
    published: z.boolean().default(false),
  }),
});

export const updateEventSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    description: z.string().min(10).optional(),
    date: z.string().datetime().optional(),
    imageUrl: z.string().url().optional().nullable(),
    category: z.string().optional().nullable(),
    published: z.boolean().optional(),
  }),
});