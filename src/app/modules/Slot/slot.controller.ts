import { catchAsync } from '../../utils/catchAsync';
import { SlotServices } from './slot.service';
import { serviceValidation } from './slot.validation';

const createSlotController = catchAsync(async (req, res) => {
  const { service, date, startTime, endTime } = req.body;
  const serviceDuration = 60;
  const slots = await SlotServices.createSlots(
    service,
    date,
    startTime,
    endTime,
    serviceDuration,
  );
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'slots created successfully',
    data: slots,
  });
});

const getSlotControllers = catchAsync(async (req, res) => {
  // Validate query params
  const { date, serviceId } =
    serviceValidation.getAvailableSlotsQuerySchema.parse(req.query);

  const slots = await SlotServices.getSlotsByDateAndServiceId({
    service: serviceId,
    date,
  });
  if (slots.length === 0) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'No Data Found',
      data: [],
    });
  } else {
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Available slots retrieved successfully',
      data: slots,
    });
  }
});

export const SlotControllers = {
  createSlotController,
  getSlotControllers,
};
