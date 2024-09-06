import { z } from 'zod';

const createSlotSchema = z.object({
  service: z.string().min(1, 'Service ID is required'),
  date: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), 'Invalid date format'),
  startTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid start time format'),
  endTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid end time format'),
});
export const serviceValidation = {
  createSlotSchema,
};
