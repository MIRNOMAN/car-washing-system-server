import httpStatus from 'http-status';
import { sendResponse } from '../../utils/sendResponse';
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
  const email = req?.query?.email as string; // Extract email from query

  // Validate email query parameter
  if (!email) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Email query parameter is required.',
    });
  }

  // Check if authorization header is present
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: 'Unauthorized access to this route. Missing or invalid token.',
    });
  }

  const token = authHeader.split(' ')[1]; // Extract the token

  try {
    const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;


    // Ensure the decoded email matches the email from the query parameter
    if (decoded.email !== email) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Unauthorized access to this route. Token does not match the requested email.',
      });
    }

    // Fetch the full user data from the database
    const result = await UserServices.getFullUserDataFormDb(email, next);

    if (result && result.success) {
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
        data: null,
      });
    }
  } catch (error) {
    // Handle JWT errors specifically
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Unauthorized access. Invalid token.',
      });
    }
    next(error); // Forward other errors to the error handler
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
  try {
    const authHeader = req.headers.authorization;
    const { email } = req.query; // Extract email from query parameters
   
    // Ensure email is provided in the query
    if (!email) {
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: 'Email is required to update the user.',
        data: null,
      });
    }

    // Validate the authorization header
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: 'You have no access to this route. Missing or invalid token.',
        data: null,
      });
    }

    const token = authHeader.split(' ')[1]; // Extract the token part
    let decoded;
    
    // Verify the JWT token and catch any token-related errors
    try {
      decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
    } catch (error) {
      return sendResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: 'Invalid token.',
        data: null,
      });
    }

    // Ensure the decoded token has the correct user email
    if (decoded.user !== email) {
      return sendResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: 'You have no access to this route. Token does not match email.',
        data: null,
      });
    }

    // Check if the role or email is being changed
    if (req.body.role || req.body.email) {
      return sendResponse(res, {
        statusCode: httpStatus.FORBIDDEN,
        success: false,
        message: 'Role and email cannot be changed. Contact admin if it is important.',
        data: null,
      });
    }

    // Update the user in the database
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
    next(error); // Forward any other errors to the error handler
  }
});



const getRoleBaseUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { role } = req.query;

  // Validate the role query parameter
  if (role !== 'admin' && role !== 'user') {
      return sendResponse(res, {
          statusCode: httpStatus.UNAUTHORIZED,
          success: false,
          message: 'Role must be admin or user.',
          data: null, // Provide a default value for data
      });
  }

  try {
      const result = await UserServices.getRoleBaseUserFormDb(role as string, next);
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
});


const changeUserRole = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await UserServices.changeUserRoleIntoDb(req.body, next);
  
  // Check if the result is returned
  if (result) {
      return sendResponse(res, {
          statusCode: result.statusCode || 200, // Default to 200 if not provided
          success: result.success,
          message: result.message,
          data: result.data,
      });
  }
});


const SignInUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await UserServices.SigninIntoDB(req.body, next);
  
  // Check if the result is returned
  if (result) {
      // Set the refresh token in a cookie
      res.cookie('refreshToken', result.refreshToken, {
          secure: false, // Set to true in production with HTTPS
          httpOnly: true,
      });

      return sendResponse(res, {
          statusCode: result.statusCode || 200, // Default to 200 if not provided
          success: result.success,
          message: result.message,
          data: result.data,
          token: result.accessToken,
      });
  }
});



export const UserControllers = {
  createUser,
  SignInUser,
  getFullUserObj,
  recoverAccount,
  getUserForRecoverAccount,
  updateSpecificUser,
  getRoleBaseUser,
  changeUserRole,
};
