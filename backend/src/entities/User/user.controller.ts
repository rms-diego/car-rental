import { FastifyReply, FastifyRequest } from "fastify";

import { UserService } from "./user.service";

import { createUserBody, editBody, loginBody } from "./@types";

export class UserController {
  static async create(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = createUserBody.parse(request.body);

    await UserService.create({ name, email, password });

    return reply.status(201).send({ message: "user created" });
  }

  static async login(request: FastifyRequest) {
    const { email, password } = loginBody.parse(request.body);

    const token = await UserService.login({ email, password });

    return { token };
  }

  static async edit(request: FastifyRequest, reply: FastifyReply) {
    const { token } = request.headers;
    const { name, email, password } = editBody.parse(request.body);

    const tokenUpdated = await UserService.edit(
      { name, email, password },
      token as string
    );

    return reply
      .status(200)
      .send({ message: "user edited", newToken: tokenUpdated });
  }
}
