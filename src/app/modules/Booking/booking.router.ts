import express from 'express';
import auth from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { bookingController } from './booking.controller';
import { bookingSchema } from './booking.validation';

const router = express.Router();

router.post(
  '/',
  auth('user', 'admin'),
  validateRequest(bookingSchema),
  bookingController.createBooking,
);
router.get('/my-bookings', auth('user'), bookingController.getMyBookings);
router.get('/', auth('admin'), bookingController.getAllBookings);
// router.get('/', bookingController.GetCar);

// router.get('/:id',bookingController.GetCarById)
// router.delete('/:id',bookingController.DeleteCar)
// router.put('/:id',auth("admin"),validateRequest(CarValidation.UpdateCarValidationSchema),bookingController.UpdateCar)

export const BookingRoutes = router;
