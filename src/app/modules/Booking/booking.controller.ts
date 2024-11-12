import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { getUserInfoFromToken } from '../../utils/getUserInfoFromToken';
import { bookingServices } from './booking.service';
import { Booking } from './booking.model';
import { handleNoDataResponse } from '../../error/handleNoData';

const createBooking = catchAsync(async (req, res) => {
  const token = req.headers.authorization as string;
  const bookingData = req.body;
  const { email } = getUserInfoFromToken(token);

  const result = await bookingServices.createBookingIntoDB(email, bookingData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking successful',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await Booking.find()
    .populate('customer', '_id name email phone address')
    .populate('service', '_id name description price duration isDeleted')
    .populate('slot', '_id service date startTime endTime isBooked')
    .lean();

  if (result?.length === 0) return handleNoDataResponse(res);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All bookings retrieved successfully',
    data: result,
  });
});

export const bookingController = { createBooking, getAllBookings };
