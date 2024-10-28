import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    phone: z.string(),
    role: z.enum(["user", "admin"]),
    address: z.string(),
  }),
});
const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  loginUserValidationSchema,
};