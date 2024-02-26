import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import UserService from '../services/userService';

const UserController = {
getUserProfile: async (req: Request & { user?: { _id: string } }, res: Response) => {
    try {
        const userProfile = await UserService.getUserProfile(req.user?._id ?? '');
        if (!userProfile) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json({ status: 'OK', user: userProfile });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server Error' });
    }
},

  updateUserProfile: async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { username, email } = req.body;
        const updatedUser = await UserService.updateUserProfile((req as Request & { user: { _id: string } }).user?._id, username, email);

        if (!updatedUser) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.status(200).json({ status: 'OK', user: updatedUser });
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  },
};

export default UserController;
