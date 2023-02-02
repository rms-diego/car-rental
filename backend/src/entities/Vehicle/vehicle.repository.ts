import { CreateVehicleDTO, EditVehicleDTO } from "./@types";

import { prisma } from "../../database";

export class VehicleRepository {
  static async getAllVehicles(userId: string) {
    const vehiclesFound = await prisma.vehicle.findMany({
      where: { userId },
    });

    return vehiclesFound;
  }

  static async findOneById(vehicleId: string) {
    const vehicleFound = await prisma.vehicle.findFirst({
      where: { id: vehicleId },
    });

    return vehicleFound;
  }

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

  static async editVehicle(
    { name, brand, type, vehicleImage }: EditVehicleDTO,
    vehicleId: string
  ) {
    const vehicleEdited = await prisma.vehicle.update({
      data: { name, brand, type, vehicleImage },
      where: { id: vehicleId },
    });

    return vehicleEdited;
  }

  static async deleteVehicle(vehicleId: string) {
    await prisma.vehicle.delete({
      where: { id: vehicleId },
    });
  }
}
