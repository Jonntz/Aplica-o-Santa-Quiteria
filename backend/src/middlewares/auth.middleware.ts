import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, TokenPayload } from '../utils/jwt';
import { AppError } from '../utils/appError';
import { logger } from '../utils/logger';

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    logger.warn(`Tentativa de acesso sem token na rota: ${req.path}`);
    return next(new AppError('Você precisa estar logado para acessar este recurso', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (error) {
    logger.warn(`Tentativa de acesso com token inválido/expirado na rota: ${req.path}`);
    return next(new AppError('Sua sessão expirou ou o token é inválido. Faça login novamente.', 401));
  }
};