import mongoose, { Schema } from 'mongoose';
import { IBooking } from './booking.interface';

// Define the Booking schema
const BookingSchema: Schema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, required: true, ref: 'User' }, // Reference to the user
    service: { type: Schema.Types.ObjectId, required: true, ref: 'Service' }, // Reference to the service
    slot: { type: Schema.Types.ObjectId, required: true, ref: 'Slot' }, // Reference to the slot
    vehicleType: {
      type: String,
      required: true,
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
    },
    vehicleBrand: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    manufacturingYear: { type: Number, required: true },
    registrationPlate: { type: String, required: true },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields
  },
);

const BookingModel = mongoose.model<IBooking>('Booking', BookingSchema);

export default BookingModel;
