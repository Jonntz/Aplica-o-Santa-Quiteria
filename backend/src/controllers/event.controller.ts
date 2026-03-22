import { Request, Response } from 'express';
import { EventService } from '../services/event.service';

const eventService = new EventService();

export const getEvents = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    // Se não for admin (rota não autenticada), forçamos publishedOnly = true
    // Vamos checar pelo Header de autorização se o usuário está logado
    const isAuth = !!req.headers.authorization;
    const publishedOnly = !isAuth || req.query.published === 'true';

    const result = await eventService.findAll(page, limit, publishedOnly);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: 'Erro ao listar eventos' });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await eventService.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Evento não encontrado' });
    
    res.json(event);
  } catch (error: any) {
    res.status(500).json({ error: 'Erro ao buscar evento' });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const event = await eventService.create(req.body);
    res.status(201).json(event);
  } catch (error: any) {
    res.status(500).json({ error: 'Erro ao criar evento' });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const event = await eventService.update(req.params.id, req.body);
    res.json(event);
  } catch (error: any) {
    res.status(500).json({ error: 'Erro ao atualizar evento' });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    await eventService.delete(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: 'Erro ao deletar evento' });
  }
};