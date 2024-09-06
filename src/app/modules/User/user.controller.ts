import httpStatus from 'http-status';
import { sendResponse, sendResponseWithToken } from '../../utils/sendResponse';
import { UserServices } from './user.service';
import { catchAsync } from '../../utils/catchAsync';

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await UserServices.createUserIntoDB(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered succesfully',
    data: result,
  });
});

const SignInUser = catchAsync(async (req, res) => {
  const result = await UserServices.SigninIntoDB(req.body);
  sendResponseWithToken(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    token: result.token,
    data: result.data,
  });
});

export const UserControllers = {
  createUser,
  SignInUser,
};
