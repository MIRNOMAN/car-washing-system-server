import mongoose, { Schema, Document } from 'mongoose';

export interface SlotDocument extends Document {
  service: mongoose.Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: 'available' | 'booked';
  createdAt: Date;
  updatedAt: Date;
}

const SlotSchema: Schema = new Schema(
  {
    service: { type: mongoose.Types.ObjectId, ref: 'Service', required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isBooked: { type: String, default: 'available' },
  },
  { timestamps: true },
);

export const SlotModel = mongoose.model<SlotDocument>('Slot', SlotSchema);
