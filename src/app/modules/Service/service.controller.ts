import { createServiceSchema, updateServiceSchema } from './service.validation';
import { catchAsync } from '../../utils/catchAsync';
import { serviceService } from './service.service';

export const createService = catchAsync(async (req, res) => {
  try {
    const validatedData = createServiceSchema.parse(req.body);
    const service = await serviceService.createService(validatedData);

    if (!service) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'service not found',
        data: [],
      });
    }

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
});

export const getServiceController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const service = await serviceService.getServiceById(id);

  if (!service) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'service not found',
      data: [],
    });
  }

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Service retrieved successfully',
    data: service,
  });
});

export const getAllServices = catchAsync(async (req, res) => {
  const result = await serviceService.getAllServiceFromDB();

  if (!result) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'service not found',
      data: [],
    });
  }

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Services retrieved successfully',
    data: result,
  });
});

export const updateServiceController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updates = updateServiceSchema.parse(req.body);

  const updatedService = await serviceService.updateServiceById(id, updates);

  if (!updatedService) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'service not found',
      data: [],
    });
  }

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Service updated successfully',
    data: updatedService,
  });
});

export const deleteServiceController = catchAsync(async (req, res) => {
  const deleteService = await serviceService.deleteServiceById({
    params: { id: req.params.id },
  });

  if (!deleteService) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'service not found',
      data: [],
    });
  }

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Service updated successfully',
    data: deleteService,
  });
});
