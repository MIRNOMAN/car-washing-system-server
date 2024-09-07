import { Schema } from 'mongoose';

export type TSlot = {
  service: Schema.Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: 'available' | 'booked' | 'canceled';
};

export type GetSlotQuery = {
  serviceId?: string;
  date?: string;
};
