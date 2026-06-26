import { supabase } from "../lib/supabase";

export const getVehiclesCount = async () => {
  const { count } = await supabase
    .from("vehicles")
    .select("*", { count: "exact", head: true });

  return count || 0;
};

export const getTransactions = async () => {
  const { data } = await supabase
    .from("transactions")
    .select("*")
    .order("created_at", { ascending: true });

  return data || [];
};

export const getRevenue = async () => {
  const { data } = await supabase
    .from("transactions")
    .select("amount");

  return (data || []).reduce((sum, t) => sum + t.amount, 0);
};