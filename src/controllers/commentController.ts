// commentController.ts

import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { CommentService } from '../services/commentService';

export class CommentController {
  private commentService: CommentService;

  constructor() {
    this.commentService = new CommentService();
  }

  async createComment(req: Request, res: Response) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { content } = req.body;
        const { supportRequestId } = req.params;
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const createdBy = (req as any).user?._id;

        const comment = await this.commentService.createComment(content, createdBy, supportRequestId);
        res.status(201).json({ status: 'OK', comment });
    } catch (error) {
      console.error('Error creating comment:', error);
      res.status(500).json({ status: 'FAILED', message: 'Internal Server Error' });
    }
  }

  async getCommentsByRequestId(req: Request, res: Response) {
    try {
      const { supportRequestId } = req.params;
      const comments = await this.commentService.getCommentsByRequestId(supportRequestId);
      res.status(200).json({ status: 'OK', comments });
    } catch (error) {
      console.error('Error getting comments:', error);
      res.status(500).json({ status: 'FAILED', message: 'Internal Server Error' });
    }
  }
}
