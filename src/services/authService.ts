// authService.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel';
import dotenv from 'dotenv';
dotenv.config();

export class AuthService {
  async register(username: string, email: string, password: string, role: string): Promise<string> {
    // Check if the user already exists
    let user = await UserModel.findOne({ email });
    if (user) {
      throw new Error('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    user = new UserModel({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    return 'User registered successfully';
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    // Check if the user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error('Invalid credentials');
    }
 
    // Generate JWT token
    const payload = { _id: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {  expiresIn: "1hr" })
  

    return { token };
  }
}
