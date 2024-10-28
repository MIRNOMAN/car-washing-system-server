import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { bookingController } from './booking.controller';
import { bookingSchema } from './booking.validation';
import Auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  Auth('user'),
  validateRequest(bookingSchema),
  bookingController.createBooking,
);
router.get('/my-bookings', Auth('user'), bookingController.getMyBookings);
router.get('/', Auth('admin'), bookingController.getAllBookings);
// router.get('/', bookingController.GetCar);

// router.get('/:id',bookingController.GetCarById)
// router.delete('/:id',bookingController.DeleteCar)
// router.put('/:id',auth("admin"),validateRequest(CarValidation.UpdateCarValidationSchema),bookingController.UpdateCar)

export const BookingRoutes = router;
