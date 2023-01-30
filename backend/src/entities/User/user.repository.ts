import { CreateUserDTO } from "./@types";

import { prisma } from "../../database";

export class UserRepository {
  static async create({ name, email, password }: CreateUserDTO) {
    const userCreated = await prisma.user.create({
      data: { name, email, password },
    });

    return userCreated;
  }

  static async findOneByEmail(email: string) {
    const userFound = await prisma.user.findFirst({
      where: { email },
    });

    return userFound;
  }
}
