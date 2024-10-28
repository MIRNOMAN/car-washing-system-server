import { Schema, model } from 'mongoose';
import { TService } from './service.interface';

const ServiceSchema = new Schema<TService>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    photo: {type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const ServiceModel = model<TService>('Service', ServiceSchema);
