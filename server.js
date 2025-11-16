// backend/server.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import Routes
import queryRoutes from './routes/queries.js';
import aiRoutes from './routes/ai.js';
import teamsRoutes from './routes/teamsRoutes.js';
import brandRoutes from './routes/brandRoutes.js'; 

dotenv.config({ path: '../.env' });

const app = express();
app.use(cors());
app.use(express.json());

// Define API routes
app.use('/api/queries', queryRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/brands', brandRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend server is running on http://localhost:${PORT}`);
});