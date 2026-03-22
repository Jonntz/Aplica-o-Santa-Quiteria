import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { logger } from '../src/utils/logger';

const prisma = new PrismaClient();

async function main() {
  logger.info('🌱 Iniciando seed do banco de dados...');

  const adminEmail = 'admin@paroquia.com';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('Admin@123', 12);

    await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'Administrador Principal',
        passwordHash: hashedPassword,
        role: 'SUPER_ADMIN',
      },
    });

    logger.info(`✅ Usuário administrador criado com sucesso: ${adminEmail}`);
  } else {
    logger.info('ℹ️ Usuário administrador já existe. Nenhuma ação necessária.');
  }
}

main()
  .catch((e) => {
    logger.error('❌ Erro crítico durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    logger.info('✅ Seed finalizado com sucesso.');
  });