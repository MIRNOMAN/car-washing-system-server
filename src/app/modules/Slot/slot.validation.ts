import { z } from 'zod';

const createValidationSlotSchema = z.object({
  service: z.string().nonempty('Service reference is required'),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), 'Invalid date format'),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid start time format'),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid end time format'),
  isBooked: z.enum(['available', 'booked', 'canceled']),
});

export const serviceValidation = {
  createValidationSlotSchema,
};
