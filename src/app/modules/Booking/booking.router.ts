import express from 'express'
import auth from '../../middlewares/auth'
import { bookingController } from './booking.controller'
import { USER_ROLE } from '../User/user.constant'

const router = express.Router()
// booking routes
router.post('/', auth(USER_ROLE.user), bookingController.createBooking)
router.get('/', auth(USER_ROLE.admin), bookingController.getAllBookings)

export const BookingsRoutes = router