import express, { Request, Response } from 'express';
import { createReport } from '../utils/reportGenerator';
import  AuthMiddleware  from '../middleware/authMiddleware';

const router = express.Router();

/* Route to generate report on closed tickets in the last one month */
router.get('/closed-tickets',AuthMiddleware.authenticateUser, AuthMiddleware.authorizeAgentOrAdmin, async (req: Request, res: Response) => {
  try {
    console.log("report");
    const reportStream = await createReport();
    // send the report as a file attachment or in the response body
    //send as a CSV file
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="closed_tickets_report.csv"');
    reportStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to generate report' });
  }
});



export default router;
