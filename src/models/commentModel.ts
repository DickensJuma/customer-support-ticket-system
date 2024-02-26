import mongoose, { Schema, Document } from 'mongoose';

export interface Comment extends Document {
  content: string;
  supportRequestId: mongoose.Types.ObjectId; // Reference to SupportRequest model
  createdBy: mongoose.Types.ObjectId; // Reference to User model
  createdAt: Date;
}

const commentSchema: Schema = new Schema({
  content: { type: String, required: true },
  supportRequestId: { type: Schema.Types.ObjectId, ref: 'SupportRequest', required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

const CommentModel = mongoose.model<Comment>('Comment', commentSchema);

export default CommentModel;

// example of comment object
// {
//   "content": "This is a comment",
//   "supportRequestId": "60f0b3b7e5d4e1a7e4f5f3b0",
//   "createdBy": "60f0b3b7e5d4e1a7e4f5f3b0"
//   "createdAt": "2021-07-16T14:48:00.000Z
//}