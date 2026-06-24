import { supabase } from "../lib/supabase";
import { Vehicle, VehicleInput } from "../types";

/**
 * GET ALL VEHICLES
 */
export async function getVehicles(): Promise<Vehicle[]> {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*");

  if (error) {
    console.error("GET VEHICLES ERROR:", error);
    throw error;
  }

  return data ?? [];
}

/**
 * CREATE VEHICLE
 */
export async function createVehicle(payload: VehicleInput) {
  const { data, error } = await supabase
    .from("vehicles")
    .insert([payload])
    .select();

  if (error) throw error;
  return data;
}

/**
 * UPDATE VEHICLE
 */
export async function updateVehicle(
  id: string,
  payload: Partial<VehicleInput>
) {
  const { data, error } = await supabase
    .from("vehicles")
    .update(payload)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
}

/**
 * DELETE VEHICLE
 */
export async function deleteVehicle(id: string) {
  const { error } = await supabase
    .from("vehicles")
    .delete()
    .eq("id", id);

  if (error) throw error;
}