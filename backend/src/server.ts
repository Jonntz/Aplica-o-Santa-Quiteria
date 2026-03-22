import app from './config/app';
import { env } from './config/env';
import { logger } from './utils/logger';

const startServer = async () => {
  try {
    app.listen(env.PORT, () => {
      logger.info(`🚀 Servidor rodando na porta ${env.PORT}`);
      logger.info(`🌍 Ambientes permitidos (CORS): ${env.CORS_ORIGIN.join(', ')}`);
    });
  } catch (error: any) {
    logger.error('❌ Erro fatal ao iniciar o servidor:', error);
    process.exit(1);
  }
};

startServer();