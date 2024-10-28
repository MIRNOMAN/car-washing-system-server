import jwt, { JwtPayload } from "jsonwebtoken";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from "express";
import httpStatus from "http-status";
import config from "../../config";
import { catchAsync } from "../../utils/catchAsync";
import { BookingServices } from "./booking.service";
import { sendResponse } from "../../utils/sendResponse";
import { UserModel } from "../User/user.model";
import { TUser } from "../User/user.interface";


const createBookings: RequestHandler = catchAsync(async (req, res) => {
  const bookingData = req.body;
  const result = await BookingServices.createBookings(bookingData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking successful",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const queryParams = req.query;
  const result = await BookingServices.getAllBookings(queryParams);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All bookings retrieved successfully",
    data: result,
  });
});
const getMyBookings = catchAsync(async (req, res) => {
  const queryParams = req.query;
  const token = req.headers.authorization;
  const decoded = jwt.verify(
    token as string,
    config.jwt_access_secret as string
  ) as JwtPayload;
  const { email } = decoded;
  const customer = await UserModel.findOne({ email: email });
  const customerId = (customer as TUser)._id;
  const result = await BookingServices.getMyBookings(customerId, queryParams);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User bookings retrieved successfully",
    data: result,
  });
});

export const BookingControllers = {
  createBookings,
  getAllBookings,
  getMyBookings,
};