import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import supportRoutes from './routes/supportRoutes';
import userRoutes from './routes/userRoutes';
import reportRoutes from './routes/reportRoutes';
import AuthMiddleware from './middleware/authMiddleware';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

dotenv.config();


const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/support', AuthMiddleware.authenticateUser, supportRoutes);
app.use('/api/user', AuthMiddleware.authenticateUser, userRoutes);
app.use('/api/report', AuthMiddleware.authenticateUser, reportRoutes);

// Error handler middleware
app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


const mongo_uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/express-auth';
// Connect to MongoDB
mongoose.connect(mongo_uri)
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

