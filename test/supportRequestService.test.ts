import { SupportRequestService } from '../src/services/supportRequestService';
import SupportRequestModel from '../src/models/supportRequestModel';
import { describe, expect, it, jest } from '@jest/globals';
import 'jest'


describe('SupportRequestService', () => {
    let supportRequestService: SupportRequestService;

    beforeEach(() => {
        supportRequestService = new SupportRequestService();
    });

    describe('createSupportRequest', () => {
        it('should create a new support request', async () => {
            // Mock dependencies or setup test database if needed
            const mockSupportRequest = { title: 'Test Request', description: 'Test Description', createdBy: { _id: '65dc5903319de7b9456f1a6f' } };
            const saveMock = jest.spyOn(SupportRequestModel.prototype, 'save').mockResolvedValueOnce(mockSupportRequest);

            const result = await supportRequestService.createSupportRequest('Test Request', 'Test Description', '65dc5903319de7b9456f1a6f');

            expect(saveMock).toHaveBeenCalled();
            expect(result).toEqual(mockSupportRequest);
        });
    });

     

});
