import { Router } from 'express';
import { AuthRoutes } from '../modules/User/user.route';
import { serviceRoute } from '../modules/Service/service.router';
import { slotRoutes } from '../modules/Slot/slot.route';
import { BookingRoutes } from '../modules/Booking/booking.router';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  { path: '/services', route: serviceRoute },
  {
    path: '/slots',
    route: slotRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
