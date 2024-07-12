import { z } from 'zod';

export const bookingSchema = z.object({
  customer: z.string().nonempty('Customer reference is required'),
  service: z.string().nonempty('Service reference is required'),
  slot: z.string().nonempty('Slot reference is required'),
  vehicleType: z.enum([
    'car',
    'truck',
    'SUV',
    'van',
    'motorcycle',
    'bus',
    'electricVehicle',
    'hybridVehicle',
    'bicycle',
    'tractor',
  ]),
  vehicleBrand: z.string().nonempty('Vehicle brand is required'),
  vehicleModel: z.string().nonempty('Vehicle model is required'),
  manufacturingYear: z
    .number()
    .int()
    .positive('Manufacturing year must be a positive integer'),
  registrationPlate: z.string().nonempty('Registration plate is required'),
});
