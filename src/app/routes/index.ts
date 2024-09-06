import { Router } from 'express';
import { authRoute } from '../modules/Auth/auth.route';
import { userRoute } from '../modules/User/user.route';
import { serviceRoute } from '../modules/Service/service.router';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
  { path: '', route: serviceRoute },
  // {
  //   path: '/services',
  //   route: slotRoute,
  // },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
