import { Error } from 'mongoose';
import { DeleteServiceInput, TService } from './service.interface';
import { ServiceModel } from './service.model';
import {} from './service.validation';

const createService = async (serviceData: TService) => {
  const result = await ServiceModel.create(serviceData);
  return result;
};

const getServiceById = async (id: string): Promise<TService> => {
  const service = await ServiceModel.findById(id);
  if (!service) {
    throw new Error('Service not found');
  }
  return service;
};

const getAllServiceFromDB = async () => {
  const result = await ServiceModel.find({ isDeleted: false });
  return result;
};

const updateServiceById = async (
  serviceId: string,
  updateData: Partial<TService>,
) => {
  const result = await ServiceModel.findByIdAndUpdate(serviceId, updateData, {
    new: true,
  });
  return result;
};

const deleteServiceById = async (input: DeleteServiceInput) => {
  const { id } = input.params;

  const service = await ServiceModel.findById(id);

  if (!service) {
    throw new Error('Service not found');
  }

  service.isDeleted = true; // Soft delete
  await service.save();

  return service;
};

export const serviceService = {
  createService,
  getServiceById,
  updateServiceById,
  deleteServiceById,
  getAllServiceFromDB,
};
