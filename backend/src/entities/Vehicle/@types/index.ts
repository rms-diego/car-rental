import { z as zod } from "zod";

// create
export const createVehicleBody = zod.object({
  type: zod.string(),
  brand: zod.string(),
  name: zod.string(),
  vehicleImage: zod.string(),
});

export interface CreateVehicleDTO {
  type: string;
  brand: string;
  name: string;
  vehicleImage: string;
}

// edit
export const editVehicleBody = zod.object({
  type: zod.string(),
  brand: zod.string(),
  name: zod.string(),
  vehicleImage: zod.string(),
});

export const editVehicleParams = zod.object({
  vehicleId: zod.string(),
});

export interface EditVehicleDTO extends CreateVehicleDTO {}

//delete
export const deleteVehicleParams = zod.object({
  vehicleId: zod.string(),
});
