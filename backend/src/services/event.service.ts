import { prisma } from '../prisma/client';
import type { Prisma } from '@prisma/client';

export class EventService {
  async findAll(page: number, limit: number, publishedOnly: boolean) {
    const skip = (page - 1) * limit;
    
    const whereClause: Prisma.EventWhereInput = publishedOnly ? { published: true } : {};

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { date: 'asc' }, // Ordena pelos mais próximos
      }),
      prisma.event.count({ where: whereClause }),
    ]);

    return {
      data: events,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string) {
    return prisma.event.findUnique({ where: { id } });
  }

  async create(data: Prisma.EventCreateInput) {
    return prisma.event.create({ data });
  }

  async update(id: string, data: Prisma.EventUpdateInput) {
    return prisma.event.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.event.delete({ where: { id } });
  }
}