import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';
import { logger } from '../utils/logger';

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      logger.warn(`Acesso negado. Usuário ${req.user?.id} tentou acessar rota restrita: ${req.path}`);
      return next(new AppError('Acesso negado. Você não tem permissão para realizar esta ação.', 403));
    }
    next();
  };
};