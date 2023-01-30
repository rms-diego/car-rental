import bcrypt from "bcrypt";

import { CreateUserDTO, LoginUserDTO } from "./@types";

import { UserRepository } from "./user.repository";

import { Exception } from "../../utils/Exception";

import { createToken } from "../../utils/jwt";

export class UserService {
  static async create({ name, email, password }: CreateUserDTO) {
    const userAlreadyExists = await UserRepository.findOneByEmail(email);

    if (userAlreadyExists) throw new Exception(400, "User already exists");

    const hash = await bcrypt.hash(password, 3);

    await UserRepository.create({
      name,
      email,
      password: hash,
    });
  }

  static async login({ email, password }: LoginUserDTO) {
    const userFound = await UserRepository.findOneByEmail(email);

    if (!userFound) {
      throw new Exception(404, "Wrong email or user does not exists");
    }

    const comparePassword = await bcrypt.compare(password, userFound.password);
    if (!comparePassword) throw new Exception(400, "Wrong password");

    const tokenPayload = {
      id: userFound.id,
      name: userFound.email,
      email: userFound.email,
    };

    const token = createToken(tokenPayload);

    return token;
  }
}
