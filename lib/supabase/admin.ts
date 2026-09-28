import 'server-only';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Missing Supabase server-only admin configuration.');
}

/**
 * Service Role Supabase Client.
 * WARNING: Bypasses Row Level Security (RLS).
 * Reserved strictly for Webhooks, Cron/Draw Engine, and verified Admin Route Handlers.
 */
export const adminClient = createSupabaseClient<Database>(
  supabaseUrl,
  serviceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);