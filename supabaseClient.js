// backend/config/supabaseClient.js

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// This tells dotenv where to find your .env file (in the parent directory)
dotenv.config({ path: '../.env' });

const supabaseUrl = process.env.SUPABASE_URL;
// IMPORTANT: The backend uses the secret SERVICE_ROLE_KEY
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Service Key must be defined in .env file");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;