import { FastifyReply, FastifyRequest } from "fastify";

import {
  createVehicleBody,
  deleteVehicleParams,
  editVehicleBody,
  editVehicleParams,
} from "./@types";

import { VehicleService } from "./vehicle.service";

export class VehicleController {
  static async create(request: FastifyRequest, reply: FastifyReply) {
    const { token } = request.headers;

    const { name, brand, type, vehicleImage } = createVehicleBody.parse(
      request.body
    );

    await VehicleService.createVehicle(
      { name, brand, type, vehicleImage },
      token as string
    );

    return reply.status(200).send({ message: "vehicle created" });
  }

  static async edit(request: FastifyRequest, reply: FastifyReply) {
    const { vehicleId } = editVehicleParams.parse(request.params);
    const { name, brand, type, vehicleImage } = editVehicleBody.parse(
      request.body
    );

    const vehicleEdited = await VehicleService.edit(
      { name, brand, type, vehicleImage },
      vehicleId
    );

    return reply.status(200).send({ vehicleEdited: vehicleEdited });
  }

  static async deleteVehicle(request: FastifyRequest, reply: FastifyReply) {
    const { vehicleId } = deleteVehicleParams.parse(request.params);

    await VehicleService.deleteVehicle(vehicleId);

    return reply.status(200).send({ message: "vehicle deleted" });
  }
}
