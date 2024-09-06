import { Router } from 'express';
import { AuthRoutes } from '../modules/User/user.route';
import { serviceRoute } from '../modules/Service/service.router';
import { slotRoutes } from '../modules/Slot/slot.route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
