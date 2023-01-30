import { z } from "zod";

export const createUserBody = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}
