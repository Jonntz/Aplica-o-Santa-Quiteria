import app from './config/app';
import { env } from './config/env';

const startServer = async () => {
  try {
    app.listen(env.PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${env.PORT}`);
      console.log(`🌍 Ambientes permitidos (CORS): ${env.CORS_ORIGIN.join(', ')}`);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
};

startServer();