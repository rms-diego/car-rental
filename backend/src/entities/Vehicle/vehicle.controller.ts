import { FastifyReply, FastifyRequest } from "fastify";

import { createVehicleBody } from "./@types";
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
}
