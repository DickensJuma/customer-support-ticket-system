
// authController.ts
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { AuthService } from '../services/authService';

export class AuthController {
  constructor(private authService: AuthService) {}

  async register(req: Request, res: Response) {
    try {
    
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Register user
      const { username, email, password, role } = req.body;
      const result = await this.authService.register(username, email, password ,role);

      res.status(201).json({ status: 'OK', message: result });
    } catch (error) {
    // console.error(error.message);
      res.status(500).json({ status: "FAILED", message: 'Server Error'});
    }
  }

  async login(req: Request, res: Response) {
    try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Login user
      const { email, password } = req.body;
      const result = await this.authService.login(email, password);

      res.status(200).json({ status: 'OK', ...result });
    } catch (error) {
     //console.error(error.message);
      res.status(500).json({ status: "FAILED", message: 'Server Error' });
    }
  }
}
