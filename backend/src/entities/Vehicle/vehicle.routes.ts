import { FastifyInstance } from "fastify";

import { VehicleController } from "./vehicle.controller";

import { Jwt } from "../../utils/jwt";

const vehicleRoutes = async (app: FastifyInstance) => {
  app.post(
    "/vehicle/create",
    { preHandler: [Jwt.validateTokenHandler] },
    VehicleController.create
  );

  app.put(
    "/vehicle/edit/:vehicleId",
    { preHandler: [Jwt.validateTokenHandler] },
    VehicleController.edit
  );

  app.delete(
    "/vehicle/edit/:vehicleId",
    { preHandler: [Jwt.validateTokenHandler] },
    VehicleController.deleteVehicle
  );
};

export { vehicleRoutes };
