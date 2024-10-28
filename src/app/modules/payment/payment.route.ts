import express from "express";
import { paymentController } from "./payment.controller";
const router = express.Router();

router.post("/confirmation", paymentController.confirmationController);
router.post("/payment-failed", paymentController.paymentFailedController);

export const PaymentRoutes = router;