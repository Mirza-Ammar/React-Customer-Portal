import { createClient } from "@supabase/supabase-js";

/**
 * These values MUST exist in your .env file
 * VITE_SUPABASE_URL
 * VITE_SUPABASE_ANON_KEY
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey
);
