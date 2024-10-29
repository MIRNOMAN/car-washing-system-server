/* eslint-disable @typescript-eslint/consistent-type-definitions */
// src/interfaces/booking.interface.ts

import { Types } from 'mongoose'

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
  | 'tractor'

export interface TBooking {
  customer: Types.ObjectId
  service: Types.ObjectId
  slot: Types.ObjectId
  vehicleType: VehicleType
  vehicleBrand: string
  vehicleModel: string
  manufacturingYear: number
  registrationPlate: string
  status: string
  tran_id: string
}

export interface TBookingRequest {
  serviceId: Types.ObjectId
  slotId: Types.ObjectId
  vehicleType: VehicleType
  vehicleBrand: string
  vehicleModel: string
  manufacturingYear: number
  registrationPlate: string
  amount: string
}