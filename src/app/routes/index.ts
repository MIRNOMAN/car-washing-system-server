import { Router } from 'express';
import { slotRoutes } from '../modules/Slot/slot.route';
import { ServiceRoutes } from '../modules/Service/service.router';
import { UserRoutes } from '../modules/User/user.route';
import { BookingRoute } from '../modules/Booking/booking.router';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  { path: '/services', route: ServiceRoutes },
  {
    path: '/slots',
    route: slotRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
