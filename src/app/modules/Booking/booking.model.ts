// src/modules/booking/booking.model.ts

import { Schema, model } from 'mongoose'
import { TBooking } from './booking.interface'

const bookingSchema = new Schema<TBooking>(
  {
    customer: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    slot: { type: Schema.Types.ObjectId, ref: 'Slot', required: true },
    vehicleType: {
      type: String,
      enum: [
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
      ],
      required: true,
    },
    vehicleBrand: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    manufacturingYear: { type: Number, required: true },
    registrationPlate: { type: String, required: true },
    tran_id: { type: String, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

export const Booking = model<TBooking>('Booking', bookingSchema)