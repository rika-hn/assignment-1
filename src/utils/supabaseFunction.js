import { supabase } from "../utils/supabase";

export const getAllRecords = async () => {
  const records = await supabase.from("study-record").select("*");
  return records.data;
};

export const deleteRecords = async (id) => {
  // const records = await supabase.from("study-record").delete().match(id);
  const records = await supabase.from("study-record").delete().match({ id });
  return records.data;
};
