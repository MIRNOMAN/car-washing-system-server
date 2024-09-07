import { z } from 'zod';

export const bookingSchema = z.object({
  serviceId: z.string(),
  slotId: z.string(),
  vehicleType: z.string(),
  vehicleBrand: z.string(),
  vehicleModel: z.string(),
  manufacturingYear: z.number().min(1886).max(new Date().getFullYear()),
  registrationPlate: z.string(),
});

export type BookingRequest = z.infer<typeof bookingSchema>;
