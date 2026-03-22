import { Router } from 'express';
import { getEvents, getEventById, createEvent, updateEvent, deleteEvent } from '../controllers/event.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createEventSchema, updateEventSchema } from '../schemas/event.schema';

const router = Router();

// Rotas públicas (Leitura)
router.get('/', getEvents);
router.get('/:id', getEventById);

// Rotas protegidas (Escrita - Necessita token JWT)
router.post('/', authenticate, validate(createEventSchema), createEvent);
router.put('/:id', authenticate, validate(updateEventSchema), updateEvent);
router.delete('/:id', authenticate, deleteEvent);

export default router;