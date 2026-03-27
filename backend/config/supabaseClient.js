const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";

let supabase;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ FATAL: Missing Supabase credentials in .env! (SUPABASE_URL or SUPABASE_KEY is empty).");
  console.error("⚠️ The backend is running in a degraded state. Please add these to your Render Environment Variables!");
  // Create a dummy client that will gracefully error on use rather than crashing the server start
  supabase = {
    from: () => ({ select: () => ({ limit: () => ({ error: { message: "Credentials missing", code: "CREDENTIALS_MISSING" } }) }) })
  };
} else {
  supabase = createClient(supabaseUrl, supabaseKey);
}

module.exports = supabase;
