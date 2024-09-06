import { TSlot } from './slot.interface';
import SlotModel from './slot.model';

export const createSlots = async (
  service: string,
  date: string,
  startTime: string,
  endTime: string,
  serviceDuration: number,
): Promise<TSlot[]> => {
  const start = convertTimeToMinutes(startTime);
  const end = convertTimeToMinutes(endTime);
  const totalDuration = end - start;
  const numberOfSlots = totalDuration / serviceDuration;

  const slots: TSlot[] = [];

  for (let i = 0; i < numberOfSlots; i++) {
    const slotStartTime = convertMinutesToTime(start + i * serviceDuration);
    const slotEndTime = convertMinutesToTime(start + (i + 1) * serviceDuration);

    const newSlot = new SlotModel({
      service,
      date,
      startTime: slotStartTime,
      endTime: slotEndTime,
      isBooked: 'available',
    });

    const savedSlot = await newSlot.save();
    slots.push(savedSlot);
  }

  return slots;
};

const convertTimeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const convertMinutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
    .toString()
    .padStart(2, '0');
  const mins = (minutes % 60).toString().padStart(2, '0');
  return `${hours}:${mins}`;
};

const getSlotsByDateAndServiceId = async ({
  service,
  date,
}: {
  service?: string;
  date?: string;
}) => {
  const query: { service?: string; date?: Date } = {}; // Use 'date' here
  if (service) {
    query.service = service;
  }
  if (date) {
    query.date = new Date(date); // Convert date string to Date object
  }

  const result = await SlotModel.find(query).populate('service');
  return result;
};

export const SlotServices = {
  createSlots,
  getSlotsByDateAndServiceId,
};
