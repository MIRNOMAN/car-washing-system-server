/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import { TBooking } from "./booking.interface";
import { UserModel } from "../User/user.model";
import { ServiceModel } from "../Service/service.model";
import SlotModel from "../Slot/slot.model";
import { AppError } from "../../error/appError";
import { BookingModel } from "./booking.model";
import QueryBuilder from "../../builder/QueryBuilder";


const createBookings = async (payload: TBooking) => {
  // validation
  const customer = await UserModel.findById(payload.customer);
  const service = await ServiceModel.findById(payload.service);
  const slot = await SlotModel.findById(payload.slot);

  if (!customer) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Does not exist");
  }
  if (customer.role === "admin") {
    throw new AppError(httpStatus.BAD_REQUEST, "Admin cannot book a service");
  }
  if (!service) {
    throw new AppError(httpStatus.BAD_REQUEST, "Service Does not exist");
  }
  if (!slot) {
    throw new AppError(httpStatus.BAD_REQUEST, "Slot Does not exist");
  }
  if (slot.isBooked === "canceled") {
    throw new AppError(httpStatus.BAD_REQUEST, "Slot is canceled");
  }

  // Check if a booking already exists in this slot
  const existingBooking = await BookingModel.findOne({ slot: slot._id });
  if (existingBooking) {
    // Delete the existing booking
    await BookingModel.findByIdAndDelete(existingBooking._id);
    // Optionally, you might also want to update the slot status here if needed
  }

  // Check the slot status after deletion
  if (slot.isBooked === "booked") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This slot is not available, please select another slot"
    );
  }

  // Proceed with creating a new booking
  const transactionId = `TXN-${Date.now()}`;
  const paymentData = {
    transactionId,
    amount: service.price,
    name: customer.name,
    email: customer.email,
    address: customer.address,
    phone: customer.phone,
  };
  const paymentSession = await initiatePayment({ paymentData });

  // Update the slot with the transaction ID
  await SlotModel.findByIdAndUpdate(slot._id, { transactionId });

  // Create the new booking
  const result = (
    await (await BookingModel.create(payload)).populate("service")
  ).populate("slot");

  return paymentSession;
};

const getAllBookings = async (queryParams: Record<string, unknown>) => {
  const BookingQuery = new QueryBuilder(BookingModel.find(), queryParams);
  BookingQuery.search(["name"]).filter().sort().paginate().fields();
  const result = await BookingQuery.modelQuery
    .populate("customer")
    .populate("service")
    .populate("slot");
  const meta = await BookingQuery.countTotal();
  return { result, meta };
};
const getMyBookings = async (
  customerId: any,
  queryParams: Record<string, unknown>
) => {
  // const result = await BookingModel.find({ customer: customerId })
  //   .populate("customer")
  //   .populate("service")
  //   .populate("slot");
  // return result;
  const MyBookingQuery = new QueryBuilder(
    BookingModel.find({ customer: customerId }),
    queryParams
  );
  MyBookingQuery.search(["name"]).filter().sort().paginate().fields();
  const result = await MyBookingQuery.modelQuery
    .populate("customer")
    .populate("service")
    .populate("slot");
  const meta = await MyBookingQuery.countTotal();
  return { result, meta };
};

export const BookingServices = {
  createBookings,
  getAllBookings,
  getMyBookings,
};