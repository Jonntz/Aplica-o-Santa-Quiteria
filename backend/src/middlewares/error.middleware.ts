import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`[Error]: ${err.message}`);
  
  // Evitar vazamento de stack trace em produção
  const response = {
    error: 'Erro interno do servidor',
    ...(process.env.NODE_ENV === 'development' && { details: err.message })
  };

  res.status(500).json(response);
};