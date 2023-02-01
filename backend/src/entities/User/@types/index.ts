import { z } from "zod";

// create
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

// login
export const loginBody = z.object({
  email: z.string().email(),
  password: z.string(),
});

export interface LoginUserDTO {
  email: string;
  password: string;
}

// edit
export const editBody = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
});

export interface EditUserDTO extends CreateUserDTO {}
