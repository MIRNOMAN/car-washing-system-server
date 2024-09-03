import express from 'express';

const router = express.Router();

// router.post(
//   '/create-user',
//   validateRequest(UserValidation.userValidationSchema),
//   UserControllers.createUser,
// );

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

export const userRoute = router;
