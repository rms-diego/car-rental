import { FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

import { Exception } from "./Exception";

const { SECRET } = process.env;

interface TokenPayloadType {
  id: string;
  name: string;
  email: string;
}

interface TokenDecoded {
  id: string;
  name: string;
  email: string;
  iat: number;
}

export class Jwt {
  static createToken(payload: TokenPayloadType) {
    const token = jwt.sign(payload, SECRET as string);

    return token;
  }

  static compareToken(data: string) {
    const decodedToken = jwt.decode(data) as null | TokenDecoded;

    return decodedToken;
  }

  static async validateTokenHandler(request: FastifyRequest) {
    const { token } = request.headers;
    if (!token) throw new Exception(400, "token is required");

    const isValidToken = Jwt.compareToken(token as string);
    if (!isValidToken) throw new Exception(400, "invalid token");
  }
}
