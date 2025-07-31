import { supabase } from "../utils/supabase";

export const getAllRecords = async () => {
  const records = await supabase.from("records").select("*");
  return records.data;
};
