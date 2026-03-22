import { Router } from 'express';
import authRoutes from './auth.routes';
import eventRoutes from './event.routes';
import liturgyRoutes from './liturgy.routes';

const router = Router();

// Montagem das rotas na API
router.use('/auth', authRoutes);
router.use('/events', eventRoutes);
router.use('/liturgy', liturgyRoutes);

export default router;