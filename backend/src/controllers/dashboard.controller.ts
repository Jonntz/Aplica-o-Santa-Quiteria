import { Request, Response, NextFunction } from 'express';
import { prisma } from '../prisma/client';

export const getDashboardStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [eventsCount, usersCount] = await Promise.all([
      prisma.event.count(),
      prisma.user.count()
    ]);

    res.json({ eventsCount, usersCount });
  } catch (error) {
    next(error);
  }
};