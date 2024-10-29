import { Slot } from '../Slot/slot.model'
import { TService } from './service.interface'
import { Service } from '../Service/service.model'



const createServiceIntoDb = async (serviceData: TService) => {
  const result = await Service.create(serviceData)
  return result
}

const getSingleServiceFromDB = async (id: string) => {
  const result = await Service.findById(id)
  return result
}

const getSingleServiceDetailsFromDB = async (id: string) => {
  const serviceResult = await Service.findById(id)
  if (serviceResult) {
    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0) // Set time to the start of today

    const slots = await Slot.find({
      service: id,
      date: { $gte: currentDate }, // Filter slots that are today or in the future
    }).sort({ date: 1 })

    return {
      service: serviceResult,
      slots: slots,
    }
  } else {
    throw new Error('Service not available')
  }
}

const updateServiceIntoDB = async (id: string, payload: Partial<TService>) => {
  const result = await Service.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteServiceFromDB = async (id: string) => {
  const deletedFaculty = await Service.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )

  return deletedFaculty
}

export const serviceServices = {
  createServiceIntoDb,
  getSingleServiceFromDB,
  getSingleServiceDetailsFromDB,
  updateServiceIntoDB,
  deleteServiceFromDB,
}