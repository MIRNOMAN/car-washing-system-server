import axios from "axios";
import config from "../../config";

export const verifyPayment = async (tnxId: string) => {
  const res = await axios.get(config.payment_verify_url!, {
    params: {
      store_id: config.store_id,
      signature_key: config.signature_key,
      type: "json",
      request_id: tnxId,
    },
  });
  return res.data;
};