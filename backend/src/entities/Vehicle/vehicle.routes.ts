import { FastifyInstance } from "fastify";

import { VehicleController } from "./vehicle.controller";

import { Jwt } from "../../utils/jwt";

const vehicleRoutes = async (app: FastifyInstance) => {
  app.post(
    "/vehicle/create",
    { preHandler: [Jwt.validateTokenHandler] },
    VehicleController.create
  );
};

export { vehicleRoutes };
