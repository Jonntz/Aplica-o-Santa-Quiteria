import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  const adminEmail = 'admin@paroquia.com';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    // Custo mínimo 12 exigido pelos requisitos de segurança
    const hashedPassword = await bcrypt.hash('Admin@123', 12);

    await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'Administrador Principal',
        passwordHash: hashedPassword,
        role: 'SUPER_ADMIN',
      },
    });

    console.log(`✅ Usuário administrador criado com sucesso: ${adminEmail}`);
  } else {
    console.log('ℹ️ Usuário administrador já existe.');
  }
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('✅ Seed finalizado.');
  });