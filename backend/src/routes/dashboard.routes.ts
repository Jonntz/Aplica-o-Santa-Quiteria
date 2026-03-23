import { Router } from 'express';
import { getDashboardStats } from '../controllers/dashboard.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Escritores e Admins podem ver o dashboard
router.get('/stats', authenticate, getDashboardStats);

export default router;