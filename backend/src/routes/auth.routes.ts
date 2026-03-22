import { Router } from 'express';
import { login, refresh, logout, getMe } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { loginSchema } from '../schemas/auth.schema';
import { authLimiter } from '../config/rateLimit';

const router = Router();

// Aplica limitador mais restrito nas rotas de autenticação
router.post('/login', authLimiter, validate(loginSchema), login);
router.post('/refresh', authLimiter, refresh);
router.post('/logout', logout);

// Rota protegida
router.get('/me', authenticate, getMe);

export default router;