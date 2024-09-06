export type TSlot = {
  service: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: 'available' | 'booked';
  createdAt?: Date;
  updatedAt?: Date;
};
