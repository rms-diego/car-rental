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
