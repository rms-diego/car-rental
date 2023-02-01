import { CreateVehicleDTO } from "./@types";

import { VehicleRepository } from "./vehicle.repository";

import { Exception } from "../../utils/Exception";

import { Jwt } from "../../utils/jwt";

export class VehicleService {
  static async createVehicle(
    { name, brand, type, vehicleImage }: CreateVehicleDTO,
    token: string
  ) {
    const tokenDecoded = Jwt.compareToken(token);

    if (tokenDecoded instanceof Exception) {
      throw new Exception(tokenDecoded.statusCode, tokenDecoded.message);
    }

    const vehicleCreated = await VehicleRepository.createVehicle(
      { name, brand, type, vehicleImage },
      tokenDecoded.id
    );

    return vehicleCreated;
  }
}
