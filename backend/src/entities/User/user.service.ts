import bcrypt from "bcrypt";

import { CreateUserDTO } from "./@types";

import { UserRepository } from "./user.repository";

import { Exception } from "../../utils/Exception";

import { createToken } from "../../utils/jwt";

export class UserService {
  static async create({ name, email, password }: CreateUserDTO) {
    const hash = await bcrypt.hash(password, 3);

    const userCreated = await UserRepository.create({
      name,
      email,
      password: hash,
    });

    const tokenPayload = {
      id: userCreated.id,
      name: userCreated.name,
      email: userCreated.email,
    };

    const token = createToken(tokenPayload);

    return token;
  }
}
