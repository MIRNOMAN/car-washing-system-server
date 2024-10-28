import axios from "axios";
import config from "../../config";
export type TransactionPayload = {
  transactionId: string;
  amount: number;
  name: string;
  email: string;
  address: string;
  phone: string;
};

export const initiatePayment = async ({
  paymentData,
}: {
  paymentData: TransactionPayload;
}) => {
  const response = await axios.post(config.payment_url!, {
    store_id: config.store_id,
    signature_key: config.signature_key,
    tran_id: paymentData.transactionId,
    success_url: `http://localhost:5000/api/payment/confirmation?transactionId=${paymentData.transactionId}`,
    fail_url:
      "http://localhost:5000/api/payment/payment-failed",
    cancel_url: "/",
    amount: paymentData.amount,
    currency: "BDT",

    desc: "Merchant Registration Payment",
    cus_name: paymentData.name,
    cus_email: paymentData.email,
    cus_add1: paymentData.address,
    cus_add2: "Mohakhali DOHS",
    cus_city: "N/A",
    cus_state: "N/A",
    cus_postcode: "N/A",
    cus_country: "Bangladesh",
    cus_phone: paymentData.phone,
    type: "json",
  });
  //   console.log(response);
  return response.data;
};