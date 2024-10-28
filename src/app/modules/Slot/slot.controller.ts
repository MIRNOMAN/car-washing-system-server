import { RequestHandler } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { SlotServices } from './slot.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createSlot: RequestHandler = catchAsync(async (req, res) => {
  const slotData = req.body;
  const result = await SlotServices.createSlotsIntoDB(slotData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slots created successfully",
    data: result,
  });
});

const getAllAvailableSlots = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await SlotServices.getAllAvailableSlots(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Available slots retrieved successfully",
    data: result,
  });
});
const getAllSlots = catchAsync(async (req, res) => {
  const queryParams = req.query;
  const result = await SlotServices.getAllSlots(queryParams);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All slots retrieved successfully",
    data: result.result,
    meta: result.meta,
  });
});
const getSingleSlots = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SlotServices.getSingleSlot(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " slots retrieved successfully",
    data: result,
  });
});
const updateSingleSlot = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { newStatus } = req.body;
  const result = await SlotServices.updateSlotStatus(id, newStatus);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slot status  updated successfully",
    data: result,
  });
});

export const SlotController = {
  createSlot,
  getAllAvailableSlots,
  updateSingleSlot,
  getSingleSlots,
  getAllSlots,
};