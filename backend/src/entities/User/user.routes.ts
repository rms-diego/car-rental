import { FastifyInstance } from "fastify";

import { UserController } from "./user.controller";

const userRoutes = async (app: FastifyInstance) => {
  app.post("/user/create", UserController.create);
};

export { userRoutes };