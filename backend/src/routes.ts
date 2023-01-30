import { FastifyInstance } from "fastify";

import { userRoutes } from "./entities/User/user.routes";

const appRoutes = async (app: FastifyInstance) => {
  app.get("/", () => ({ message: "Teste" }));

  app.register(userRoutes);
};

export { appRoutes };
