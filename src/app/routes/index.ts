import { Router } from 'express'
import { AuthRoutes } from '../modules/auth/auth.route'
import { PaymentRoutes } from '../modules/payment/payment.route'
import { UserRoutes } from '../modules/User/user.route'
import { ServiceRoutes } from '../modules/Service/service.router'
import { SlotRoutes } from '../modules/Slot/slot.route'
import { BookingsRoutes } from '../modules/Booking/booking.router'

const router = Router()

const moduleRoutes = [
  {
    path: '/',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/services',
    route: ServiceRoutes,
  },
  {
    path: '/slots',
    route: SlotRoutes,
  },
  {
    path: '/bookings',
    route: BookingsRoutes,
  },
  {
    path: '/payment',
    route: PaymentRoutes,
  },
  
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router