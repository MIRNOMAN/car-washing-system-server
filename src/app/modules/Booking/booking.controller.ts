import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { TBooking } from './booking.interface';
import { bookingService } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  try {
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

    const booking = await bookingService.createBooking({
      serviceId,
      slotId,
      user: userId.toString(),
      vehicleType,
      vehicleBrand,
      vehicleModel,
      manufacturingYear,
      registrationPlate,
    });

    if (booking) {
      return res.status(200).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'Booking successful',
        data: booking,
      });
    } else {
      return res.status(400).json({
        success: false,
        statusCode: httpStatus.BAD_REQUEST,
        message: 'Failed to create booking',
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
    });
  }
});

const getAllBookings = catchAsync(async (req, res) => {
  try {
    const bookings = await bookingService.getAllBookings();
    return res.status(200).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'All bookings retrieved successfully',
      data: bookings,
    });
  } catch (error) {
    // console.error(error);
    return res.status(500).json({
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
    });
  }
});

const getMyBookings = catchAsync(async (req, res) => {
  try {
    const userId = req.user?._id; // Assuming you have user information from JWT in req.user

    if (!userId) {
      return res.status(401).json({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: 'Unauthorized: User not found',
      });
    }

    const bookings = await bookingService.getMyBookings(userId.toString());
    return res.status(200).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'User bookings retrieved successfully',
      data: bookings,
    });
  } catch (error) {
    // console.error(error);
    return res.status(500).json({
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
    });
  }
});

const updateBooking = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const updateData: Partial<TBooking> = req.body;

    const updatedBooking = await bookingService.updateBookingById(
      id,
      updateData,
    );

    if (updatedBooking) {
      return res.status(200).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'Booking updated successfully',
        data: updatedBooking,
      });
    } else {
      return res.status(404).json({
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: 'Booking not found',
      });
    }
  } catch (error) {
    // console.error(error);
    return res.status(500).json({
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
    });
  }
});

const getBooking = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await bookingService.getBookingById(id);

    if (booking) {
      return res.status(200).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'Booking retrieved successfully',
        data: booking,
      });
    } else {
      return res.status(404).json({
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: 'Booking not found',
      });
    }
  } catch (error) {
    // console.error(error);
    return res.status(500).json({
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
    });
  }
});

export const bookingController = {
  createBooking,
  getAllBookings,
  getMyBookings,
  updateBooking,
  getBooking,
};
