import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { slotServices } from './slot.service'
import { handleNoDataResponse } from '../../error/handleNoData'


const createSlot = catchAsync(async (req, res) => {
  const slotData = req.body
  const result = await slotServices.createSlotIntoDB(slotData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Slot created successfully!',
    data: result,
  })
})
const getAvailableSlots = catchAsync(async (req, res) => {
  const result = await slotServices.getAllAvailableSlotsFromDB()
  if (result?.length === 0) {
    return handleNoDataResponse(res)
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Available slots retrieved successfully',
    data: result,
  })
})
const getAllSlots = catchAsync(async (req, res) => {
  const result = await slotServices.getAllSlotsFromDB()
  if (result?.length === 0) {
    return handleNoDataResponse(res)
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Available slots retrieved successfully',
    data: result,
  })
})

const updateSlot = catchAsync(async (req, res) => {
  const { id } = req.params
  const payload = req.body
  const result = await slotServices.updateSlotIntoDB(id, payload)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Slot updated successfully',
    data: result,
  })
})

export const slotController = {
  createSlot,
  getAvailableSlots,
  updateSlot,
  getAllSlots,
}