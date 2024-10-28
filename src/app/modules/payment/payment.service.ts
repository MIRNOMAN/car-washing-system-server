import SlotModel from "../Slot/slot.model";
import { verifyPayment } from "./payment.utils";

const confirmationService = async (transactionId: string) => {
  //   console.log(transactionId, "inside service");
  let result;
  const verifyResponse = await verifyPayment(transactionId);
  // console.log(verifyResponse.pay_status, "responseeeee");
  if (verifyResponse.pay_status === "Successful") {
    result = await SlotModel.findOneAndUpdate(
      { transactionId },
      { isBooked: "booked" },
      { new: true }
    );
  }
  return result;
};
const paymentFailedService = async (transactionId: string) => {
  //   console.log(transactionId, "inside service");
  let result;
  const verifyResponse = await verifyPayment(transactionId);
  if (verifyResponse.pay_status === "Successful") {
    result = await SlotModel.findOneAndUpdate(
      { transactionId },
      { isBooked: "booked" }
    );
  }
  return result;
};

export const PaymentService = {
  confirmationService,
  paymentFailedService,
};