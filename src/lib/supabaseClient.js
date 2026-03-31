import { createClient } from '@supabase/supabase-js';

// IMPORTANT: Because you are using Create React App (react-scripts), 
// environment variables MUST start with REACT_APP_ and use process.env.
// If you migrate to Vite later, change these to import.meta.env.VITE_
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
