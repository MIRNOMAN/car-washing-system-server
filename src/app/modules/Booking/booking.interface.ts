import { Schema } from 'mongoose';

export type VehicleType =
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

export type TBooking = {
  customer: Schema.Types.ObjectId; // Reference to the user who made the booking
  service: Schema.Types.ObjectId; // Reference to the booked service
  slot: Schema.Types.ObjectId; // Reference to the booking slot
  vehicleType: VehicleType; // Type of the vehicle
  vehicleBrand: string; // Brand or manufacturer of the vehicle
  vehicleModel: string; // Model or variant of the vehicle
  manufacturingYear: number; // Manufacturing year of the vehicle
  registrationPlate: string; // Unique registration number assigned to the vehicle
  createdAt: Date; // Timestamp of creation
  updatedAt: Date; // Timestamp of last update
};

// export interface IBooking extends Document, TBooking {}
