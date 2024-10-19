import { z } from 'zod';

const userValidationSchema = z.object({
  name: z.string(),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  phone: z.string(),
  address: z.string(),
  role: z.enum(['user', 'admin']),
  isDeleted: z.boolean().default(false),
});

const updateUserValidationSchema = z.object({
  body: z.object({
      name: z.string().optional(),
      address: z.string().optional(),
      phone: z.string().optional(),
      password: z.string().optional()
  })
});

const AuthValidationSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const UserValidation = {
  userValidationSchema,
  AuthValidationSchema,
  updateUserValidationSchema
};
