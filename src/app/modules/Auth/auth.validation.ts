import { z } from 'zod';

const userLoginValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

const UpdateUserLoginValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).optional(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .optional(),
});
export const authValidation = {
  userLoginValidationSchema,
  UpdateUserLoginValidationSchema,
};
