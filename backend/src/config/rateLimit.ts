import rateLimit from 'express-rate-limit';

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limita cada IP a 100 requisições por windowMs
  message: 'Muitas requisições deste IP, por favor tente novamente mais tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // Limite mais restrito para rotas de login/refresh (prevenção brute force)
  message: 'Muitas tentativas de autenticação. Tente novamente mais tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});