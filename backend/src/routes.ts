import { FastifyInstance } from "fastify";

import { userRoutes } from "./entities/User/user.routes";
import { vehicleRoutes } from "./entities/Vehicle/vehicle.routes";

const appRoutes = async (app: FastifyInstance) => {
  app.get("/", () => ({ message: "Hello world !" }));

  app.register(userRoutes);
  app.register(vehicleRoutes);
};

export { appRoutes };
