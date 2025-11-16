// backend/routes/ai.js (AFTER - CORRECT)

import express from 'express';
// Use curly braces {} to import a specific, NAMED function
import { geminiAction } from '../controllers/aiController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Now we can use the imported function directly
router.post('/:action', protect, geminiAction);

export default router;