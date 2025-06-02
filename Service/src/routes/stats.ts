import express from 'express';
import playerStatsController from '../controller/playerStats'; // Adjust the path as necessary

const router = express.Router();

// Use the playerStatsController for all /player-stats routes
router.use('/player-stats', playerStatsController);

export default router;
