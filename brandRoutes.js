// backend/routes/brandRoutes.js

import express from 'express';
import { connectBrand } from '../controllers/brandController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/connect').post(protect, connectBrand);

export default router;