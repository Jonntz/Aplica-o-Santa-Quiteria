import { Request, Response } from 'express';
import { LiturgyService } from '../services/liturgy.service';

const liturgyService = new LiturgyService();

export const getLiturgy = async (req: Request, res: Response) => {
  try {
    // Pega a data de hoje por padrão
    const today = new Date();
    
    // Extrai do query param ou usa fallback para hoje
    // padStart garante que o dia/mês tenha sempre 2 dígitos (ex: "03" em vez de "3")
    const dia = (req.query.dia as string) || String(today.getDate()).padStart(2, '0');
    const mes = (req.query.mes as string) || String(today.getMonth() + 1).padStart(2, '0');
    const ano = (req.query.ano as string) || String(today.getFullYear());

    const liturgyData = await liturgyService.getLiturgyByDate(dia, mes, ano);
    
    res.json(liturgyData);
  } catch (error: any) {
    res.status(503).json({ error: error.message });
  }
};