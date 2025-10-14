// src/utils/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

export function createSupabaseClient() {
  const isNode =
    typeof process !== "undefined" && process.release?.name === "node";
  let supabaseUrl, supabaseAnonKey;

  if (isNode) {
    supabaseUrl = process.env.VITE_SUPABASE_URL;
    supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
  } else {
    // eslint-disable-next-line no-undef
    supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    // eslint-disable-next-line no-undef
    supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}
