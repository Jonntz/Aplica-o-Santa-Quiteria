import { Router } from 'express';
import { getLiturgy } from '../controllers/liturgy.controller';
import { validate } from '../middlewares/validate.middleware';
import { liturgyQuerySchema } from '../schemas/liturgy.schema';

const router = Router();

// Rota pública para buscar liturgia (valida parâmetros de query opcionais)
router.get('/', validate(liturgyQuerySchema), getLiturgy);

export default router;