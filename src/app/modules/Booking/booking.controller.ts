import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';

const createBooking = catchAsync(async (req, res) => {
  const userId = req.user?._id; // Assuming you have user information from JWT in req.user
  const {
    serviceId,
    slotId,
    vehicleType,
    vehicleBrand,
    vehicleModel,
    manufacturingYear,
    registrationPlate,
  } = req.body;

  if (!userId) {
    return res.status(401).json({
      success: false,
      statusCode: httpStatus.UNAUTHORIZED,
      message: 'Unauthorized: User not found',
    });
  }
});
