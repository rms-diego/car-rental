import jwt from "jsonwebtoken";
import { Exception } from "./Exception";

const { SECRET } = process.env;

const createToken = (data: any) => {
  const token = jwt.sign(data, SECRET as string);

  return token;
};

const compareToken = (data: string) => {
  try {
    const decodedToken = jwt.decode(data);

    return decodedToken;
  } catch {
    throw new Exception(400, "Token Invalido");
  }
};

export { createToken, compareToken };
