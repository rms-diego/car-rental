import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

import { Exception } from "./Exception";

const { SECRET } = process.env;

interface TokenPayloadType {
  id: string;
  name: string;
  email: string;
}

export class Jwt {
  static createToken(payload: TokenPayloadType) {
    const token = jwt.sign(payload, SECRET as string);

    return token;
  }

  static compareToken(data: string) {
    try {
      const decodedToken = jwt.decode(data);

      return decodedToken;
    } catch {
      throw new Exception(400, "Token Invalido");
    }
  }

  static async validateTokenHandler(request: FastifyRequest) {
    const { token } = request.headers;

    if (!token) throw new Exception(400, "token is required");
    Jwt.compareToken(token as string);
  }
}
