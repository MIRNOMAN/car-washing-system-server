import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserValidation } from '../User/user.validation';
import { authValidation } from './auth.validation';
import { authControllers } from './auth.controller';
import { UserControllers } from '../User/user.controller';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createUser,
);

router.post(
  '/login',
  // auth(USER_ROLE.user),
  validateRequest(authValidation.UpdateUserLoginValidationSchema),
  authControllers.loginUser,
);

// router.post(
//   '/create-faculty',
//   auth(USER_ROLE.admin),
//   validateRequest(facultyValidations.createFacultyValidationSchema),
//   UserControllers.createFaculty,
// );

// router.post(
//   '/create-admin',
//   // auth(USER_ROLE.admin),
//   validateRequest(AdminValidations.createAdminValidationSchema),
//   UserControllers.createAdmin,
// );

export const authRoute = router;
