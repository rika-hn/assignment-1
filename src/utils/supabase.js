import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "process.VITE_PUBLIC_SUPABASE_URL",
  "process.VITE_PUBLIC_SUPABASE_ANON_KEY"
);
