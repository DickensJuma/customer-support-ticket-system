// supportRequestController.ts
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { SupportRequestService } from '../services/supportRequestService';

export class SupportRequestController {
  constructor(private supportRequestService: SupportRequestService) {}

  async createSupportRequest(req: Request, res: Response) {
    try {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description } = req.body;
        const supportRequest = await this.supportRequestService.createSupportRequest(title, description, (req as Request & { user: { _id: string } }).user._id);

        res.status(201).json({ status: 'OK', supportRequest });
    } catch (error) {
      console.error('Error creating support request:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  }

  async getSupportRequests(req: Request, res: Response) {
    try {
      // Get all support requests
      const supportRequests = await this.supportRequestService.getSupportRequests();

      res.status(200).json({ status: 'OK', supportRequests });
    } catch (error) {
      console.error('Error getting support requests:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  }

  async processSupportRequest(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Process the support request
      const { id } = req.params;
      const { status } = req.body;
      const supportRequest = await this.supportRequestService.processSupportRequest(id, status);

      res.status(200).json({ status: 'OK', supportRequest });
    } catch (error) {
      console.error('Error processing support request:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  }


}