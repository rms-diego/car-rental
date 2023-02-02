import bcrypt from "bcrypt";

import { CreateUserDTO, EditUserDTO, LoginUserDTO } from "./@types";

import { VehicleService } from "../Vehicle/vehicle.service";

import { UserRepository } from "./user.repository";

import { Exception } from "../../utils/Exception";

import { Jwt } from "../../utils/jwt";

export class UserService {
  private static async userExists(userId: string) {
    const userFound = await UserRepository.findOneById(userId);

    if (!userFound) throw new Exception(400, "user does not exists");
  }

  static async getAllVehicles(token: string) {
    const tokenDecoded = Jwt.compareToken(token);

    if (tokenDecoded) {
      await UserService.userExists(tokenDecoded.id);

      const allVehicles = await VehicleService.getAllVehicles(tokenDecoded.id);

      return allVehicles;
    }
  }

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
      throw new Exception(404, "wrong email or user does not exists");
    }

    const comparePassword = await bcrypt.compare(password, userFound.password);
    if (!comparePassword) throw new Exception(400, "wrong password");

    const tokenPayload = {
      id: userFound.id,
      name: userFound.name,
      email: userFound.email,
    };

    const token = Jwt.createToken(tokenPayload);

    return token;
  }

  static async edit({ name, email, password }: EditUserDTO, token: string) {
    const tokenDecoded = Jwt.compareToken(token);

    if (tokenDecoded) {
      await UserService.userExists(tokenDecoded.id);

      const hashPassword = await bcrypt.hash(password, 3);
      const userEdited = await UserRepository.edit(
        { name, email, password: hashPassword },
        tokenDecoded.id
      );

      const tokenPayload = {
        id: userEdited.id,
        name: userEdited.name,
        email: userEdited.email,
      };

      const updateToken = Jwt.createToken(tokenPayload);

      return updateToken;
    }
  }

  static async deleteUser(token: string) {
    const tokenDecoded = Jwt.compareToken(token);

    if (tokenDecoded) {
      await UserService.userExists(tokenDecoded.id);

      await UserRepository.deleteUser(tokenDecoded.id);
    }
  }
}
