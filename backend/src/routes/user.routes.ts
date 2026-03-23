import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createUserSchema, updateUserSchema } from '../schemas/user.schema';

const router = Router();

// Todas as rotas de usuários exigem autenticação E que o usuário seja ADMIN
router.use(authenticate, authorize(['ADMIN']));

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', validate(createUserSchema), createUser);
router.put('/:id', validate(updateUserSchema), updateUser);
router.delete('/:id', deleteUser);

export default router;