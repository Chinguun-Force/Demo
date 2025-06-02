import express from 'express';
import leagueSummaryController from '../controller/leagueSummary'; // Adjust the path as necessary

const router = express.Router();

// Use the leagueSummaryController for all /league-summary routes
router.use('/', leagueSummaryController);

export default router; 