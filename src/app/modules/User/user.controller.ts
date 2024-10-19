import httpStatus from 'http-status';
import { sendResponse, sendResponseWithToken } from '../../utils/sendResponse';
import { UserServices } from './user.service';
import { catchAsync } from '../../utils/catchAsync';
import jwt,{ JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import config from '../../config';

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



const getFullUserObj = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const email = req?.query?.email as string;

  // Check authorization header
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: 'Unauthorized access to this route.',
    });
  }

  const token = authHeader.split(' ')[1]; // Extract the token

  try {
    const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;

    // Ensure the token's user matches the requested email
    if (decoded.email !== email) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Unauthorized access to this route.',
      });
    }

    // Fetch the full user data from the database
    const result = await UserServices.getFullUserDataFormDb(email, next);
    
    if (result) {
      return res.status(result.statusCode).json({
        success: result.success,
        statusCode: result.statusCode,
        message: result.message,
        data: result.data,
      });
    } else {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'User not found in database.',
      });
    }
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Invalid token, access denied.',
      });
    }
    next(error);
  }
};


const recoverAccount = catchAsync(async (req, res,next) => {
  const userData = req.body; // Assuming this contains the necessary data for account recovery
  const result = await UserServices.recoverAccountFromDb(userData, next);

  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Account recovery successful',
      data: result,
  });
});


const getUserForRecoverAccount = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const email = req.query?.email as string;

  const result = await UserServices.getUserForRecoverAccountFormDb(email, next);

  if (result) {
      sendResponse(res, {
          statusCode: result.statusCode || httpStatus.OK, // Default to 200 if statusCode is not provided
          success: result.success,
          message: result.message,
          data: result.data || null,
      });
  } else {
      sendResponse(res, {
          statusCode: httpStatus.NOT_FOUND,
          success: false,
          message: 'User not found.',
          data: null,
      });
  }
});



const updateSpecificUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const { email } = req.query;

  // Check if the role or email is being changed
  if (req.body.role || req.body.email) {
      return sendResponse(res, {
          statusCode: httpStatus.FORBIDDEN,
          success: false,
          message: 'Role and email cannot be changed. Contact admin if it is important.',
          data: null,
      });
  }

  // Validate the authorization header
  if (!authHeader || !authHeader.startsWith('Bearer')) {
      return sendResponse(res, {
          statusCode: httpStatus.UNAUTHORIZED,
          success: false,
          message: 'You have no access to this route.',
          data: null,
      });
  }

  const extractToken = authHeader.slice(7);

  // Verify the JWT token
  jwt.verify(extractToken, config.jwt_access_secret as string, async (err, decoded) => {
      if (err) {
          return sendResponse(res, {
              statusCode: httpStatus.UNAUTHORIZED,
              success: false,
              message: 'You have no access to this route.',
              data: null,
          });
      } else {
          // Check if the decoded user matches the email being updated
          if ((decoded as JwtPayload).user !== email) {
              return sendResponse(res, {
                  statusCode: httpStatus.UNAUTHORIZED,
                  success: false,
                  message: 'You have no access to this route.',
              });
          } else {
              try {
                  // Call the service to update the user
                  const result = await UserServices.updateSpecificUserIntoDb(req.body, email as string, next);
                  if (result) {
                      return sendResponse(res, {
                          statusCode: result.statusCode || httpStatus.OK,
                          success: result.success,
                          message: result.message,
                          data: result.data,
                      });
                  }
              } catch (error) {
                  next(error);
              }
          }
      }
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
  getFullUserObj,
  recoverAccount,
  getUserForRecoverAccount,
  updateSpecificUser
};
