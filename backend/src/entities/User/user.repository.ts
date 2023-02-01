import { CreateUserDTO, EditUserDTO } from "./@types";

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

  static async findOneById(id: string) {
    const userFound = await prisma.user.findFirst({
      where: { id },
    });

    return userFound;
  }

  static async edit({ name, email, password }: EditUserDTO, userId: string) {
    const userEdited = await prisma.user.update({
      data: { name, email, password },
      where: { id: userId },
    });

    return userEdited;
  }

  static async deleteUser(userId: string) {
    await prisma.user.delete({
      where: { id: userId },
    });
  }
}
