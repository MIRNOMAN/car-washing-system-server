import mongoose from 'mongoose';
import { serviceValidation } from './slot.validation';
import { SlotModel } from './slot.model';

export const createSlots = async (data: {
  service: string;
  date: string;
  startTime: string;
  endTime: string;
}) => {
  const { service, date, startTime, endTime } = data;

  // Validate the data
  serviceValidation.createSlotSchema.parse(data);

  // Convert time to minutes
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);

  const startTotalMinutes = startHour * 60 + startMin;
  const endTotalMinutes = endHour * 60 + endMin;
  const totalDuration = endTotalMinutes - startTotalMinutes;
  const slotDuration = 60;

  if (totalDuration % slotDuration !== 0) {
    throw new Error('Invalid time range');
  }

  const numberOfSlots = totalDuration / slotDuration;

  const slots = [];
  for (let i = 0; i < numberOfSlots; i++) {
    const slotStartMinutes = startTotalMinutes + i * slotDuration;
    const slotEndMinutes = slotStartMinutes + slotDuration;

    const slotStartTime = `${String(Math.floor(slotStartMinutes / 60)).padStart(2, '0')}:${String(
      slotStartMinutes % 60,
    ).padStart(2, '0')}`;
    const slotEndTime = `${String(Math.floor(slotEndMinutes / 60)).padStart(2, '0')}:${String(
      slotEndMinutes % 60,
    ).padStart(2, '0')}`;

    slots.push({
      service: new mongoose.Types.ObjectId(service),
      date: new Date(date),
      startTime: slotStartTime,
      endTime: slotEndTime,
    });
  }

  const createdSlots = await SlotModel.insertMany(slots);
  return createdSlots;
};
