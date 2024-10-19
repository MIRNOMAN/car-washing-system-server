import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';
import CheckUniqueEmail from '../../middlewares/checkUniqueEmail';
import Auth from '../../middlewares/auth';


const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.userValidationSchema),CheckUniqueEmail(),
  UserControllers.createUser,
);
router.post(
  '/login',
  validateRequest(UserValidation.AuthValidationSchema),
  UserControllers.SignInUser,
);

router.patch('/user/update', validateRequest(UserValidation.updateUserValidationSchema), UserControllers.updateSpecificUser)

router.get('/user', UserControllers.getFullUserObj);
router.get('/user/recovery', UserControllers.getUserForRecoverAccount);
router.patch('/user/recovery/passed', UserControllers.recoverAccount);
router.get('/users', Auth('admin'), UserControllers.getRoleBaseUser);
router.patch('/user/update-role', Auth('admin'), UserControllers.changeUserRole)

export const AuthRoutes = router;


//  "email": "mirnoman123@gmail.com",
//   "password": "noman12345"