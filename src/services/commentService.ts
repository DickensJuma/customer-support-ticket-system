// commentService.ts

import CommentModel, { Comment } from '../models/commentModel';

export class CommentService {
  async createComment(content: string, createdBy: string, supportRequestId: string): Promise<Comment> {


    const hasSupportAgentCommented = await CommentModel.exists({ supportRequestId, createdBy: { $ne: createdBy } });
    if (!hasSupportAgentCommented) {
      throw new Error('Cannot create comment: A support agent must comment first.');
    }

    const newComment = new CommentModel({
      content,
      createdBy,
      supportRequestId,
    });
    await newComment.save();
    return newComment;
  }

  async getCommentsByRequestId(supportRequestId: string): Promise<Comment[]> {
    const comments = await CommentModel.find({ supportRequestId });
    return comments;
  }
}
