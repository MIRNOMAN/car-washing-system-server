import { Types } from 'mongoose';

export type TBooking = {
  customer: Types.ObjectId; // Assuming this is a reference to a User model
  service: Types.ObjectId; // Reference to the Service model
  slot: Types.ObjectId; // Reference to the Slot model
  vehicleType:
    | 'car'
    | 'truck'
    | 'SUV'
    | 'van'
    | 'motorcycle'
    | 'bus'
    | 'electricVehicle'
    | 'hybridVehicle'
    | 'bicycle'
    | 'tractor';
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
};
