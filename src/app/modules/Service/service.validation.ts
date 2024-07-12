import { z } from 'zod';

export const serviceSchema = z.object({
  name: z.string().nonempty('Title of the service is required'),
  description: z.string().nonempty('Description is required'),
  price: z.number().positive('Price must be a positive number'),
  duration: z.number().positive('Duration must be a positive number'),
  isDeleted: z.boolean().optional(),
});

export const serviceValidation = {
  serviceSchema,
};
