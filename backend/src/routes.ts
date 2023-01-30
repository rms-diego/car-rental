import { FastifyInstance } from "fastify";

const appRoutes = async (app: FastifyInstance) => {
  app.get("/", () => ({ message: "Teste" }));
};

export { appRoutes };
