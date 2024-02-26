// supportRequestService.ts
import SupportRequestModel from '../models/supportRequestModel';

export class SupportRequestService {
  async createSupportRequest(title: string, description: string, createdBy: string): Promise<unknown> {
    // Create a new support request
    const supportRequest = new SupportRequestModel({ title, description, createdBy });
    return await supportRequest.save();
  }

async processSupportRequest(id: string, status: "open" | "closed" | "processing"): Promise<unknown> {
    // Process the support request with the given ID
    const supportRequest = await SupportRequestModel.findById(id);
    if (!supportRequest) throw new Error('Support request not found');

    supportRequest.status = status;
    return await supportRequest.save();
}

async getSupportRequests(): Promise<unknown> {
    // Get all support requests
    return await SupportRequestModel.find().populate('createdBy', 'username email');
}

}
