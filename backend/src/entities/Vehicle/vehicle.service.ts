import { CreateVehicleDTO, EditVehicleDTO } from "./@types";

import { VehicleRepository } from "./vehicle.repository";

import { Jwt } from "../../utils/jwt";
import { Exception } from "../../utils/Exception";

export class VehicleService {
  private static async vehicleExists(vehicleId: string) {
    const vehicleExists = await VehicleRepository.findOneById(vehicleId);

    if (!vehicleExists) throw new Exception(400, "vehicle does not exists");
  }

  static async getAllVehicles(userId: string) {
    const vehiclesFound = await VehicleRepository.getAllVehicles(userId);

    const serializeVehiclesFound = vehiclesFound.map((vehicle) => {
      const serializedVehicle = {
        id: vehicle.id,
        name: vehicle.name,
        brand: vehicle.brand,
        type: vehicle.type,
        vehicleImage: vehicle.vehicleImage,
      };

      return serializedVehicle;
    });

    return serializeVehiclesFound;
  }

  static async createVehicle(
    { name, brand, type, vehicleImage }: CreateVehicleDTO,
    token: string
  ) {
    const tokenDecoded = Jwt.compareToken(token);

    if (tokenDecoded) {
      const vehicleCreated = await VehicleRepository.createVehicle(
        { name, brand, type, vehicleImage },
        tokenDecoded.id
      );

      return vehicleCreated;
    }
  }

  static async edit(
    { name, brand, type, vehicleImage }: EditVehicleDTO,
    vehicleId: string
  ) {
    await VehicleService.vehicleExists(vehicleId);

    const vehicleEdited = await VehicleRepository.editVehicle(
      { name, brand, type, vehicleImage },
      vehicleId
    );

    const serializeVehicleEdited = {
      id: vehicleEdited.id,
      name: vehicleEdited.name,
      brand: vehicleEdited.brand,
      type: vehicleEdited.type,
      vehicleImage: vehicleEdited.vehicleImage,
    };

    return serializeVehicleEdited;
  }
}
