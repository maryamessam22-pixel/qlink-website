import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://vveftffbvwptlsqqeygp.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'sb_publishable_bsCGwopSC-xFZyt_wiBPNA_4wcGHVgQ';

if (!process.env.REACT_APP_SUPABASE_URL || !process.env.REACT_APP_SUPABASE_ANON_KEY) {
  console.warn('Supabase env vars missing from build; using local fallback values. Restart dev server if you just added .env.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
