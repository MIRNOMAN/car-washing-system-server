/* eslint-disable @typescript-eslint/consistent-type-definitions */
// src/modules/slot/slot.service.ts
import { Types } from 'mongoose'
import { Slot } from './slot.model'
import { TSlot } from './slot.interface'
import { generateSlots } from './slot.utils'
import { Service } from '../Service/service.model'


interface SlotData {
  service: string
  date: Date
  startTime: string
  endTime: string
}

const createSlotIntoDB = async (slotData: SlotData): Promise<TSlot[]> => {
  // Fetch the service to get its duration
  const service = await Service.findById(slotData.service)
  if (!service) {
    throw new Error('Service not found')
  }

  const serviceDuration = service.duration
  if (!serviceDuration) {
    throw new Error('Service duration is not defined')
  }

  const slots = generateSlots(
    slotData.startTime,
    slotData.endTime,
    serviceDuration,
  )

  const slotDocuments = slots.map((slot) => ({
    service: new Types.ObjectId(slotData.service),
    date: slotData.date,
    startTime: slot.startTime,
    endTime: slot.endTime,
  }))

  const createdSlots = await Slot.insertMany(slotDocuments)
  return createdSlots.map((slot) => slot.toObject() as TSlot) // Convert to plain objects
}

const getAllAvailableSlotsFromDB = async () => {
  const result = await Slot.find({ isBooked: { $ne: 'booked' } })
    .populate({
      path: 'service',
      match: { isDeleted: { $ne: true } },
    })
    .sort({ createdAt: -1 })
  const filteredResult = result.filter((slot) => slot.service !== null)
  return filteredResult
}
const getAllSlotsFromDB = async () => {
  const result = await Slot.find()
    .populate({
      path: 'service',
      match: { isDeleted: { $ne: true } },
    })
    .sort({ createdAt: -1 })
  const filteredResult = result.filter((slot) => slot.service !== null)
  return filteredResult
}

const updateSlotIntoDB = async (id: string, payload: Partial<TSlot>) => {
  const slot = await Slot.findById(id)
  // Check if the slot exists
  if (!slot) {
    throw new Error('Slot not found.')
  }
  // Check if the slot is already booked
  if (slot.isBooked === 'booked') {
    throw new Error('This slot is already booked and cannot be updated.')
  }

  const result = await Slot.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

export const slotServices = {
  createSlotIntoDB,
  getAllAvailableSlotsFromDB,
  updateSlotIntoDB,
  getAllSlotsFromDB,
}