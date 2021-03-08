import { Router } from 'express';

import authMiddleware from './app/middlewares/authMiddleware';

import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';

const router = Router();

// Authenticate User (Login)
router.post('/auth', AuthController.authenticate);

// Create User
router.post('/users', UserController.store);

// List All Users (without autorization) - OBS: FOR DEVELOPMENT PURPOSES
router.get('/listUsers', UserController.listAll);

// Get id (EXAMPLE authenticated request passing Token)
router.get('/exampleAuthenticatedRoute', authMiddleware, UserController.index);

// Update User
router.put('/users', authMiddleware, UserController.update);

export default router;