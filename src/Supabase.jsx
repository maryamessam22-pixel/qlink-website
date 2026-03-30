import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://vveftffbvwptlsqgeygp.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)