// backend/routes/queryRoutes.js

import express from 'express';
import { getQueries, getQueryById, updateQueryStatus } from '../controllers/queryController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getQueries);
router.route('/:id').get(protect, getQueryById); // <-- ENSURE THIS LINE EXISTS
router.route('/:id/status').put(protect, updateQueryStatus);

export default router;