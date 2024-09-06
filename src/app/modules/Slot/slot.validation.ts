import { z } from 'zod';

const createSlotSchema = z.object({
  service: z.string(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  isBooked: z.enum(['available', 'booked', 'canceled']),
});
export const serviceValidation = {
  createSlotSchema,
};
