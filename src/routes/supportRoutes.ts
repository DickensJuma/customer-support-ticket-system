import express, { Router } from 'express';
import { body, param } from 'express-validator';
import { SupportRequestController } from '../controllers/supportRequestController';
import { SupportRequestService } from '../services/supportRequestService';
import { CommentController } from '../controllers/commentController';
import AuthMiddleware from '../middleware/authMiddleware';

const router: Router = express.Router();
const supportRequestService = new SupportRequestService();
const supportRequestController = new SupportRequestController(supportRequestService);

const commentController = new CommentController();


/* POST /api/support/request */
router.post(
  '/request',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
  ],
  AuthMiddleware.authenticateUser,
  supportRequestController.createSupportRequest.bind(supportRequestController)
);

/* GET /api/support/requests */
router.get('/requests',
supportRequestController.getSupportRequests.bind(supportRequestController));

/* PUT /api/support/requests/:id/process */
router.put(
  '/requests/:id/process',
  [
    body('status').notEmpty().withMessage('Status is required'),
  ],
  AuthMiddleware.authenticateUser, AuthMiddleware.authorizeAgentOrAdmin,
  supportRequestController.processSupportRequest.bind(supportRequestController)
);


/* POST /api/support/requests/:supportRequestId/comment */
router.post(
  '/:supportRequestId/comment',
  [
    param('supportRequestId').notEmpty().withMessage('Support request ID is required'),
    body('content').notEmpty().withMessage('Comment content is required'),
  ],
  AuthMiddleware.authenticateUser,
  commentController.createComment.bind(commentController)
);

router.get('/:supportRequestId/comments', AuthMiddleware.authenticateUser, commentController.getCommentsByRequestId.bind(commentController));

export default router;

