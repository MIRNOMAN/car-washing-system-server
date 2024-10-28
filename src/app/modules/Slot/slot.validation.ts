/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';

const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

const timeComparisonRefinement = (data: any) => {
  const [startHour, startMinute] = data.startTime.split(":").map(Number);
  const [endHour, endMinute] = data.endTime.split(":").map(Number);
  const startTime = startHour * 60 + startMinute;
  const endTime = endHour * 60 + endMinute;

  if (endTime <= startTime) {
    throw new Error("endTime must be greater than startTime");
  }
  const minimumGap = 60;
  if (endTime - startTime < minimumGap) {
    throw new Error(
      "The gap between startTime and endTime must be at least 1 hour"
    );
  }
  return true;
};


const createSlotValidationSchema = z.object({
  body: z
    .object({
      date: z.string().datetime(),
      startTime: z
        .string()
        .regex(timeRegex, "Invalid time format, should be HH:MM"),
      endTime: z
        .string()
        .regex(timeRegex, "Invalid time format, should be HH:MM"),
      isBooked: z.enum(["available", "booked", "canceled"]),
    })
    .refine(timeComparisonRefinement, {
      message: "endTime must be greater than startTime",
      path: ["endTime"],
    }),
});
 

export const SlotValidations = {
  createSlotValidationSchema,
};
