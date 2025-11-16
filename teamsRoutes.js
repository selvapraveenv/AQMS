// backend/routes/teamsRoutes.js

import express from 'express';
import { getTeamsOverview } from '../controllers/teamsController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// A single endpoint that returns both overview and member list
router.route('/overview').get(protect, getTeamsOverview);

export default router;