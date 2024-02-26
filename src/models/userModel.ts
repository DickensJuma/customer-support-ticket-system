import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  role: 'customer' | 'support_agent' | 'admin';
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'support_agent', 'admin'], default: 'customer' },
});

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;

// example of user object
// {
//   "username": "testuser",
//   "email": "testuser@gmail.com",
//   "password": "testpassword",
//   "role": "customer"
//}
