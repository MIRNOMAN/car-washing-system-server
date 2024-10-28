import httpStatus from 'http-status';
import { AppError } from '../../error/appError';
import { TSlot } from './slot.interface';
import SlotModel from './slot.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { ServiceModel } from '../Service/service.model';

const createSlotsIntoDB = async (payload: TSlot) => {
  const {
    serviceId,
    date,
    startTime,
    endTime,
    transactionId = "",
    isBooked = "available",
  } = payload;

  const isServiceExist = await ServiceModel.findById(serviceId);
  console.log(isServiceExist);
  if (!isServiceExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Service Does not exist");
  }
  const slotDuration = isServiceExist.duration;

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);
  const startTimeInMinutes = startHour * 60 + startMinute;
  const endTimeInMinutes = endHour * 60 + endMinute;

  const totalAvailableTime = endTimeInMinutes - startTimeInMinutes;

  if (totalAvailableTime < slotDuration) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Time range is less than the slot duration"
    );
  }

  if (totalAvailableTime % slotDuration !== 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Time range is not divisible by the slot duration ${
        slotDuration / 60
      } hours`
    );
  }

  const slots: TSlot[] = [];

  for (
    let time = startTimeInMinutes;
    time < endTimeInMinutes;
    time += slotDuration
  ) {
    const slotStartHour = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const slotStartMinute = (time % 60).toString().padStart(2, "0");
    const slotEndHour = Math.floor((time + slotDuration) / 60)
      .toString()
      .padStart(2, "0");
    const slotEndMinute = ((time + slotDuration) % 60)
      .toString()
      .padStart(2, "0");

    slots.push({
      serviceId,
      date: new Date(date),
      startTime: `${slotStartHour}:${slotStartMinute}`,
      endTime: `${slotEndHour}:${slotEndMinute}`,
      isBooked,
      transactionId,
    });
  }

  const result = await SlotModel.insertMany(slots);
  return result;
};

const getAllAvailableSlots = async (query: Record<string, unknown>) => {
  const searchQuery = SlotModel.find({
    isBooked: { $ne: "booked" },
  });
  const result = await searchQuery.find(query).populate("serviceId");
  return result;
};
const getAllSlots = async (queryParams: Record<string, unknown>) => {
  const slotQuery = new QueryBuilder(SlotModel.find(), queryParams);
  slotQuery.search(["name"]).filter().sort().paginate().fields();
  const result = await slotQuery.modelQuery.populate("serviceId");
  const meta = await slotQuery.countTotal();
  return { result, meta };
};
const getSingleSlot = async (id: string) => {
  const isSlotExist = await SlotModel.findById(id);
  if (!isSlotExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Slot not found");
  }
  const result = await SlotModel.findById(id);
  return result;
};
const updateSlotStatus = async (
  slotId: string,
  newStatus: "available" | "canceled"
) => {
  // Check if the slot exists
  const slot = await SlotModel.findById(slotId);
  if (!slot) {
    throw new AppError(httpStatus.NOT_FOUND, "Slot not found");
  }
  // Check if the slot is booked
  if (slot.isBooked === "booked") {
    throw new AppError(httpStatus.FORBIDDEN, "Cannot update a booked slot");
  }
  // Check if the new status is valid
  if (!["available", "canceled"].includes(newStatus)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid status");
  }

  // Update the slot status
  slot.isBooked = newStatus;
  const updatedSlot = await slot.save();

  return updatedSlot;
};

export const SlotServices = {
  createSlotsIntoDB,
  getAllAvailableSlots,
  updateSlotStatus,
  getSingleSlot,
  getAllSlots,
};