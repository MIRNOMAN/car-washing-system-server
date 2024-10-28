import express from "express";
import auth from "../../middlewares/auth";
import { BookingsValidation } from "./booking.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { BookingControllers } from "./booking.controller";

const router = express.Router();
router.post(
  "/bookings",
  auth("user"),
  validateRequest(BookingsValidation.createBookings),
  BookingControllers.createBookings
);
router.get("/bookings", auth("admin"), BookingControllers.getAllBookings);
router.get("/my-bookings", auth("user"), BookingControllers.getMyBookings);

export const BookingRoute = router;