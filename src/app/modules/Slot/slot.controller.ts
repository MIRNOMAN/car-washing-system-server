import { catchAsync } from '../../utils/catchAsync';
import { createSlots } from './slot.service';

export const createSlotController = catchAsync(async (req, res) => {
  const slots = await createSlots(req.body);

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Slots created successfully',
    data: slots,
  });
});
