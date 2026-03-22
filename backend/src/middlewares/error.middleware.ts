import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';
import { logger } from '../utils/logger';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // Se for um erro conhecido da nossa aplicação (AppError)
  if (err instanceof AppError) {
    logger.warn(`[AppError] ${err.statusCode} - ${err.message} - Path: ${req.path}`);
    return res.status(err.statusCode).json({ error: err.message });
  }

  // Se for um erro inesperado
  logger.error(`[Unhandled Error] ${err.message} - Path: ${req.path}`, err.stack);
  
  // Resposta amigável para o usuário final, escondendo a stack trace em produção
  const response = {
    error: 'Ocorreu um erro interno no servidor. Por favor, tente novamente mais tarde.',
    ...(process.env.NODE_ENV === 'development' && { details: err.message })
  };

  res.status(500).json(response);
};