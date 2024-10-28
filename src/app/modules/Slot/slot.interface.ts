import { Schema } from 'mongoose';

export type TSlot = {
  serviceId: Schema.Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  transactionId?: string;
  isBooked: 'available' | 'booked' | 'canceled';
};

export type GetSlotQuery = {
  serviceId?: string;
  date?: string;
};
