import express from 'express';
import { body } from 'express-validator';
import UserController from '../controllers/userController';
import AuthMiddleware from '../middleware/authMiddleware';


const router = express.Router();

/* GET /api/user/profile */
router.get('/profile', AuthMiddleware.authenticateUser, UserController.getUserProfile);


/* PUT /api/user/profile */
router.put(
  '/profile',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email'),
  ],
  AuthMiddleware.authenticateUser,
  UserController.updateUserProfile
);

export default router;
