import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { corsConfig } from './cors';
import { globalLimiter } from './rateLimit';
import { errorHandler } from '../middlewares/error.middleware';
import routes from '../routes/index.routes';

const app: Application = express();

// Middlewares de Segurança e Configuração Base
app.use(helmet());
app.use(corsConfig);
app.use(express.json());
app.use(cookieParser());
app.use(globalLimiter);

// Healthcheck
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Rotas Principais
app.use('/api', routes);

// Tratamento de rotas não encontradas
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Handler Global de Erros (deve ser o último middleware)
app.use(errorHandler);

export default app;