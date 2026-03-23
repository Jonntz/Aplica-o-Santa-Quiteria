import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';

const userService = new UserService();

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try { res.json(await userService.findAll()); } catch (error) { next(error); }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try { res.json(await userService.findById(req.params.id)); } catch (error) { next(error); }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try { res.status(201).json(await userService.create(req.body)); } catch (error) { next(error); }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try { res.json(await userService.update(req.params.id, req.body)); } catch (error) { next(error); }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Evitar que o usuário delete a si mesmo
    if (req.user?.id === req.params.id) {
      return res.status(400).json({ error: 'Você não pode deletar a si mesmo' });
    }
    await userService.delete(req.params.id);
    res.status(204).send();
  } catch (error) { next(error); }
};