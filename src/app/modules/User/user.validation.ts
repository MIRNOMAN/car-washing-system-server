import { z } from 'zod';

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    phone: z.string().min(1, 'Phone is required'),
    address: z.string().min(1, 'Address is required')
  }),
})
// For updating user information
const updateUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ invalid_type_error: 'Name must be a string' })
      .min(1, 'Name is required')
      .optional(),
    email: z
      .string({ invalid_type_error: 'Email must be a string' })
      .email('Invalid email address')
      .optional(),
    password: z
      .string({ invalid_type_error: 'Password must be a string' })
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password cannot exceed 20 characters')
      .optional(),
    phone: z
      .string({ invalid_type_error: 'Phone number must be a string' })
      .min(10, 'Phone number must be at least 10 characters')
      .max(15, 'Phone number cannot exceed 15 characters')
      .optional(),
    role: z
      .enum(['admin', 'user'], { invalid_type_error: 'Role must be either "admin" or "user"' })
      .optional(),
    address: z
      .string({ invalid_type_error: 'Address must be a string' })
      .min(1, 'Address is required')
      .optional(),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
