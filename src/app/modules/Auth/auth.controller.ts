import httpStatus from 'http-status';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import { authValidation } from './auth.validation';
import { AuthService } from './auth.service';

const authService = new AuthService();

const loginUser = catchAsync(async (req, res) => {
  const loginData = authValidation.userLoginValidationSchema.parse(req.body);

  // Call the login service
  const { token, user } = await authService.login(loginData);

  // Send the response

  // const { refreshToken, accessToken } = result;

  // res.cookie('refreshToken', refreshToken, {
  //   secure: config.NODE_ENV === 'production',
  //   httpOnly: true,
  // });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    token,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      address: user.address,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  });
});

export const authControllers = {
  loginUser,
};
