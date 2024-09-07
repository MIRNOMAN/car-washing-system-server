import { z } from 'zod';

const createSlotSchema = z.object({
  service: z.string(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  isBooked: z.enum(['available', 'booked', 'canceled']),
});

 const getAvailableSlotsQuerySchema = z.object({
  date: z.string().optional(), 
  serviceId: z.string().optional(), 
}); 

export const serviceValidation = {
  createSlotSchema,
  getAvailableSlotsQuerySchema
};
