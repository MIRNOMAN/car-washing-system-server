import { transactionId } from '../../utils/utils';
import { initiatePayment } from '../payment/payment.utils';
import { Service } from '../Service/service.model';
import { Slot } from '../Slot/slot.model';
import { User } from '../User/user.model';
import { TBooking, TBookingRequest } from './booking.interface';
import { Booking } from './booking.model';

const createBookingIntoDB = async (email: string, bookingData: TBookingRequest) => {
  const userInfo = await User.findOne({ email });
  if (!userInfo) throw new Error('User not found');
  
  const serviceInfo = await Service.findById(bookingData.serviceId);
  if (!serviceInfo) throw new Error('Service not found');
  
  const slotInfo = await Slot.findById(bookingData.slotId);
  if (!slotInfo) throw new Error('Slot not found');

  const paymentData = {
    transactionId,
    amount: bookingData.amount,
    customerName: userInfo.name,
    customerEmail: email,
    customerPhone: userInfo.phone,
    customerAddress: userInfo.address,
    paidStatus: 'booked',
  };
  const paymentRes = await initiatePayment(paymentData);

  const newBookingData: Partial<TBooking> = {
    customer: userInfo._id,
    service: serviceInfo._id,
    slot: slotInfo._id,
    vehicleType: bookingData.vehicleType,
    vehicleBrand: bookingData.vehicleBrand,
    vehicleModel: bookingData.vehicleModel,
    manufacturingYear: bookingData.manufacturingYear,
    registrationPlate: bookingData.registrationPlate,
    tran_id: transactionId,
    status: 'pending',
  };
  await Booking.create(newBookingData);
  
  return paymentRes;
};

export const bookingServices = { createBookingIntoDB };
