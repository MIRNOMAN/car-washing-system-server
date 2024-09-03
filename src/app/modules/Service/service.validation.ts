import { z } from 'zod';

export const createServiceSchema = z.object({
  name: z.string().min(1, 'Service name is required'),
  description: z.string().min(1, 'Service description is required'),
  price: z.number().positive('Price must be a positive number'),
  duration: z.number().positive('Duration must be a positive number'),
  isDeleted: z.boolean().default(false),
});

export const updateServiceSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().positive('Price must be a positive number').optional(),
  duration: z
    .number()
    .positive('Duration must be a positive number')
    .optional(),
  isDeleted: z.boolean().optional(),
});

export type CreateServiceDTO = z.infer<typeof createServiceSchema>;
export type UpdateServiceValidation = z.infer<typeof updateServiceSchema>;
