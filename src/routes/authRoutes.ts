// authRoute.ts
import express, { Router } from 'express';
import { body } from 'express-validator';
import { AuthController } from '../controllers/authController';
import { AuthService } from '../services/authService';

const router: Router = express.Router();
const authService = new AuthService();
const authController = new AuthController(authService);

  /* POST /api/auth/register */
router.post(
  '/register',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  authController.register.bind(authController)
);

/* POST /api/auth/login */
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  authController.login.bind(authController)
);

export default router;
