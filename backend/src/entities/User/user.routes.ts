import { FastifyInstance } from "fastify";

import { UserController } from "./user.controller";

import { Jwt } from "../../utils/jwt";

const userRoutes = async (app: FastifyInstance) => {
  app.post("/user/create", UserController.create);
  app.post("/user/login", UserController.login);

  app.put(
    "/user/edit",
    { preHandler: [Jwt.validateTokenHandler] },
    UserController.edit
  );

  app.delete(
    "/user/deleteUser",
    { preHandler: [Jwt.validateTokenHandler] },
    UserController.deleteUser
  );
};

export { userRoutes };
