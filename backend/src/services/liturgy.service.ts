import axios from 'axios';

// Interface para o cache em memória
interface CacheItem {
  data: any;
  timestamp: number;
}

// Map simples para atuar como cache no Node.js
const liturgyCache = new Map<string, CacheItem>();
const CACHE_TTL = 60 * 60 * 1000; // 1 hora de cache

export class LiturgyService {
  async getLiturgyByDate(dia: string, mes: string, ano: string) {
    const cacheKey = `${dia}-${mes}-${ano}`;
    const cachedItem = liturgyCache.get(cacheKey);

    // Retorna do cache se existir e não estiver expirado
    if (cachedItem && (Date.now() - cachedItem.timestamp < CACHE_TTL)) {
      console.log(`[Cache Hit] Liturgia para ${cacheKey}`);
      return cachedItem.data;
    }

    console.log(`[Cache Miss] Buscando Liturgia para ${cacheKey} na API externa...`);
    const url = `https://liturgia.up.railway.app/v2/?dia=${dia}&mes=${mes}&ano=${ano}`;
    
    try {
      const response = await axios.get(url);
      
      // Salva no cache
      liturgyCache.set(cacheKey, {
        data: response.data,
        timestamp: Date.now(),
      });

      return response.data;
    } catch (error: any) {
      console.error(`Erro ao buscar liturgia na API externa: ${error.message}`);
      throw new Error('Não foi possível buscar a liturgia no momento.');
    }
  }
}