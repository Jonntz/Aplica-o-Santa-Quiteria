import axios from 'axios';
import { logger } from '../utils/logger';
import { AppError } from '../utils/appError';

interface CacheItem {
  data: any;
  timestamp: number;
}

const liturgyCache = new Map<string, CacheItem>();
const CACHE_TTL = 60 * 60 * 1000;

export class LiturgyService {
  async getLiturgyByDate(dia: string, mes: string, ano: string) {
    const cacheKey = `${dia}-${mes}-${ano}`;
    const cachedItem = liturgyCache.get(cacheKey);

    if (cachedItem && (Date.now() - cachedItem.timestamp < CACHE_TTL)) {
      logger.info(`[Cache Hit] Liturgia servida do cache para a data: ${cacheKey}`);
      return cachedItem.data;
    }

    logger.info(`[Cache Miss] Buscando Liturgia na API externa para a data: ${cacheKey}`);
    const url = `https://liturgia.up.railway.app/v2/?dia=${dia}&mes=${mes}&ano=${ano}`;
    
    try {
      const response = await axios.get(url);
      
      liturgyCache.set(cacheKey, {
        data: response.data,
        timestamp: Date.now(),
      });

      logger.info(`[Liturgy API] Dados da liturgia cacheados com sucesso para: ${cacheKey}`);
      return response.data;
    } catch (error: any) {
      logger.error(`Erro ao buscar liturgia na API externa: ${error.message}`);
      throw new AppError('Não foi possível buscar a liturgia no momento. O serviço externo pode estar indisponível.', 503);
    }
  }
}