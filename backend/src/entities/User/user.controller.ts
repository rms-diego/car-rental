import { FastifyRequest } from "fastify";

import { UserService } from "./user.service";

import { createUserBody } from "./@types";

export class UserController {
  static async create(request: FastifyRequest) {
    const { name, email, password } = createUserBody.parse(request.body);

    const token = await UserService.create({ name, email, password });

    return { token };
  }
}
