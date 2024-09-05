import { Error } from 'mongoose';
import { TService } from './service.interface';
import { ServiceModel } from './service.model';
import {
  CreateServiceDTO,
  DeleteServiceInput,
  UpdateServiceValidation,
} from './service.validation';

export class ServiceService {
  public async createService(serviceData: CreateServiceDTO) {
    const newService = new ServiceModel(serviceData);
    await newService.save();
    return newService;
  }
}

export const getServiceById = async (id: string): Promise<TService> => {
  const service = await ServiceModel.findById(id);
  if (!service) {
    throw new Error('Service not found');
  }
  return service.toObject();
};

export const getAllServiceFromDB = async (searchTerm?: string) => {
  let filter = {};
  if (searchTerm) {
    filter = {
      name: { $regex: searchTerm, $options: 'i' }, // assuming you are searching by product name
    };
  }
  const result = await ServiceModel.find(filter);
  return result;
};

export const updateServiceById = async (
  id: string,
  updates: UpdateServiceValidation,
): Promise<TService> => {
  const service = await ServiceModel.findByIdAndUpdate(id, updates, {
    new: true,
  });
  if (!service) {
    throw new Error('Service not found');
  }
  return service.toObject();
};

export const deleteServiceById = async (input: DeleteServiceInput) => {
  const { id } = input.params;

  const service = await ServiceModel.findById(id);

  if (!service) {
    throw new Error('Service not found');
  }

  service.isDeleted = true; // Soft delete
  await service.save();

  return service;
};
