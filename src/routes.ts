import { Router } from 'express';

import authMiddleware from './app/middlewares/authMiddleware';

import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';

const router = Router();

// Create User
router.post('/users', UserController.store);

// Authenticate User (Login)
router.post('/auth', AuthController.authenticate);

// List User (authenticated request passing Token)
router.get('/users', authMiddleware, UserController.index);

export default router;