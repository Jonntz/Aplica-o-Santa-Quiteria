import { prisma } from '../prisma/client';
import { hashPassword } from '../utils/password';
import { AppError } from '../utils/appError';

export class UserService {
  async findAll() {
    return prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, role: true }
    });
    if (!user) throw new AppError('Usuário não encontrado', 404);
    return user;
  }

  async create(data: any) {
    const exists = await prisma.user.findUnique({ where: { email: data.email } });
    if (exists) throw new AppError('Este e-mail já está em uso', 400);

    const passwordHash = await hashPassword(data.password);
    
    const user = await prisma.user.create({
      data: { name: data.name, email: data.email, role: data.role, passwordHash },
      select: { id: true, name: true, email: true, role: true }
    });
    return user;
  }

  async update(id: string, data: any) {
    if (data.email) {
      const exists = await prisma.user.findUnique({ where: { email: data.email } });
      if (exists && exists.id !== id) throw new AppError('Este e-mail já está em uso', 400);
    }

    const updateData: any = { ...data };
    if (data.password) {
      updateData.passwordHash = await hashPassword(data.password);
      delete updateData.password;
    }

    return prisma.user.update({
      where: { id },
      data: updateData,
      select: { id: true, name: true, email: true, role: true }
    });
  }

  async delete(id: string) {
    const count = await prisma.user.count();
    if (count <= 1) throw new AppError('Não é possível deletar o último usuário do sistema', 400);
    
    return prisma.user.delete({ where: { id } });
  }
}