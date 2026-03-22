import { prisma } from '../prisma/client';
import { comparePassword } from '../utils/password';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';
import { AppError } from '../utils/appError';
import { logger } from '../utils/logger';

export class AuthService {
  async login(email: string, password: string) {
    logger.info(`Iniciando tentativa de login para o email: ${email}`);
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      logger.warn(`Falha no login: Email não encontrado (${email})`);
      throw new AppError('E-mail ou senha incorretos.', 401);
    }

    const isValidPassword = await comparePassword(password, user.passwordHash);
    
    if (!isValidPassword) {
      logger.warn(`Falha no login: Senha incorreta para o email (${email})`);
      throw new AppError('E-mail ou senha incorretos.', 401);
    }

    const payload = { id: user.id, role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    logger.info(`Login realizado com sucesso para o usuário: ${user.id}`);

    return {
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      accessToken,
      refreshToken
    };
  }

  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, role: true }
    });
    
    if (!user) {
      throw new AppError('Usuário não encontrado no sistema.', 404);
    }
    
    return user;
  }
}