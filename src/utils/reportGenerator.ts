import SupportRequestModel from '../models/supportRequestModel';
import { createObjectCsvStringifier } from 'csv-writer';
import { Readable } from 'stream';

export async function createReport(): Promise<Readable> {
  try {
    // Query closed support requests in the last one month
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const supportRequests = await SupportRequestModel.find({
      status: 'closed',
      updatedAt: { $gte: oneMonthAgo },
    }).populate('createdBy', 'username email');

    // Format data for CSV
    const csvStringifier = createObjectCsvStringifier({
      header: [
        { id: 'title', title: 'Title' },
        { id: 'description', title: 'Description' },
        { id: 'createdBy', title: 'Created By' },
        { id: 'createdAt', title: 'Created At' },
        { id: 'updatedAt', title: 'Updated At' },
      ],
    });

    // Prepare CSV data
    const csvData = [];
    for (const request of supportRequests) {
      const createdBy = request.createdBy?.toJSON() as unknown as { username: string, email: string } | null;
      csvData.push({
        title: request.title,
        description: request.description,
        createdBy: createdBy ? `${createdBy.username} (${createdBy.email})` : '',
        createdAt: request.createdAt.toISOString(),
        updatedAt: request.updatedAt.toISOString(),
      });
    }

    // Create Readable stream for CSV data
    const readableStream = new Readable();
    readableStream.push(csvStringifier.getHeaderString());
    for (const line of csvData) {
      readableStream.push(csvStringifier.stringifyRecords([line]));
    }
    readableStream.push(null); // Signal end of stream

    return readableStream;
  } catch (error) {
    console.error('Failed to generate report:', error);
    throw error;
  }
}
