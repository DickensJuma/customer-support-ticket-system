import mongoose, { Schema, Document } from 'mongoose';

export interface SupportRequest extends Document {
  title: string;
  description: string;
  status: 'open' | 'closed' | 'processing';
  comments : mongoose.Types.ObjectId[]; 
  createdBy: mongoose.Types.ObjectId; // Reference to User model
  createdAt: Date;
  updatedAt: Date;
}

const supportRequestSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['open','processing', 'closed'], default: 'open' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', required: false }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const SupportRequestModel = mongoose.model<SupportRequest>('SupportRequest', supportRequestSchema);

export default SupportRequestModel;

//example of supportRequest object
// {
//   "title": "Support request title",
//   "description": "Support request description",
//   "status": "open",
//   "createdBy": "60f0b3b7e5d4e1a7e4f5f3b0",
//   "comments": ["60f0b3b7e5d4e1a7e4f5f3b0"],
//  "createdAt": "2021-07-16T14:48:00.000Z",
// }

