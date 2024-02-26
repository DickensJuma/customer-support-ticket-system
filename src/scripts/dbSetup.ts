import mongoose from 'mongoose';
import  UserModel from '../models/userModel';
import SupportRequestModel from '../models/supportRequestModel';
import CommentModel from '../models/commentModel';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();



// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase')

// Define types for sample documents
interface UserDocument {
    _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role?: string;
}

interface SupportRequestDocument {
 _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  status: 'open' | 'closed' | 'processing';
  createdBy: mongoose.Types.ObjectId;
}

interface CommentDocument {
  content: string;
  supportRequestId: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
}

// Seed Data
const seedData = async () => {
  try {
    // Insert users
    const users: UserDocument[] = [
      { username: "John", email: "john@fincra.com", password: await bcrypt.hash("password1", 10), _id: new mongoose.Types.ObjectId() },
      { username: "Bob", email: "bob@fincra.com",role: "support_agent", password: await bcrypt.hash("password2", 10), _id: new mongoose.Types.ObjectId() },
      { username: "Winnie", email: "winnie@fincra.com", password: await bcrypt.hash("password3", 10), _id: new mongoose.Types.ObjectId() },
      { username: "Jane", email: "jane@fincra.com",role: "admin", password: await bcrypt.hash("password4", 10), _id: new mongoose.Types.ObjectId() }
    ];

    

    await UserModel.insertMany(users);
    // Insert support requests
    const supportRequests: SupportRequestDocument[] = [
        { title: "Network problem", description: "We are experiencing network proble in out blocck", status: "open", createdBy: users[0]._id , _id: new mongoose.Types.ObjectId() },
        { title: "Process delay", description: "The processes are taking long to respond, kindly take alook at it", status: "closed", createdBy: users[1]._id , _id: new mongoose.Types.ObjectId() }
    ];
    await SupportRequestModel.insertMany(supportRequests);

    // Insert comments
    const comments: CommentDocument[] = [
        { content: "We are sending out team to look at it", supportRequestId: supportRequests[0]._id, createdBy: users[0]._id },
        { content: "Kindly change the network and use the newly set one", supportRequestId: supportRequests[1]._id, createdBy: users[1]._id }
    ];
    await CommentModel.insertMany(comments);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.disconnect();
  }
};

// Call the seedData function to populate the database with seed data
seedData();
