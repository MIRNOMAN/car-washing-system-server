import { Types } from 'mongoose';

export type TSlot = {
  service: Types.ObjectId; // Assuming this is a reference to a Service model
  date: string; // ISO 8601 date string
  startTime: string; // ISO 8601 time string
  endTime: string; // ISO 8601 time string
  isBooked: 'available' | 'booked' | 'canceled';
};
