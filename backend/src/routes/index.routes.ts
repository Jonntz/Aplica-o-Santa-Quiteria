import { Router } from 'express';
import authRoutes from './auth.routes';
import eventRoutes from './event.routes';
import liturgyRoutes from './liturgy.routes';
import userRoutes from './user.routes';
import dashboardRoutes from './dashboard.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/events', eventRoutes);
router.use('/liturgy', liturgyRoutes);
router.use('/users', userRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;