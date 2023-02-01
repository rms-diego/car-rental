import { CreateVehicleDTO } from "./@types";

import { prisma } from "../../database";

export class VehicleRepository {
  static async createVehicle(
    { name, brand, type, vehicleImage }: CreateVehicleDTO,
    userId: string
  ) {
    const vehicleCreated = await prisma.vehicle.create({
      data: {
        brand,
        name,
        type,
        vehicleImage,
        userId,
      },
    });

    return vehicleCreated;
  }

  static async getAllVehicles(userId: string) {
    const vehiclesFound = await prisma.vehicle.findMany({
      where: { userId },
    });

    return vehiclesFound;
  }
}
