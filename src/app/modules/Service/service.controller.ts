import { Request, Response } from 'express';
import {
  getAllServiceFromDB,
  getServiceById,
  ServiceService,
  updateServiceById,
} from './service.service';
import { createServiceSchema, updateServiceSchema } from './service.validation';

const serviceService = new ServiceService();

export const createService = async (req: Request, res: Response) => {
  try {
    const validatedData = createServiceSchema.parse(req.body);
    const service = await serviceService.createService(validatedData);

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Service created successfully',
      data: service,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: error instanceof Error ? error.message : 'Validation error',
    });
  }
};

export const getServiceController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const service = await getServiceById(id);

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Service retrieved successfully',
    data: service,
  });
};

export const getAllServices = async (req: Request, res: Response) => {
  const searchTerm = req.query.searchTerm as string;
  const result = await getAllServiceFromDB(searchTerm);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Services retrieved successfully',
    data: result,
  });
};

export const updateServiceController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = updateServiceSchema.parse(req.body);

  if (!req.user?.isAdmin) {
    throw new Error('Access denied');
  }

  const updatedService = await updateServiceById(id, updates);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Service updated successfully',
    data: updatedService,
  });
};
