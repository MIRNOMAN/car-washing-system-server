import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../error/appError';
import config from '../config';
import { TUserRole } from '../modules/User/user.interface';
import { UserModel } from '../modules/User/user.model';




const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Check if the authorization header exists
    const authHeader = req.headers.authorization;

    // Check if the authorization header exists
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Authorization header is missing or malformed!');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Token is missing!');
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
      // console.log('Decoded JWT:', decoded);
    } catch (err) {
      // console.error('JWT verification failed:', err);
      throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid or expired token!');
    }

    const { email } = decoded;

    // Check if the user exists
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
    }

    // Check if the user is deleted
    if (user.isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user has been deleted!');
    }

    // Check if the user has the required role
    if (requiredRoles.length && !requiredRoles.includes(user.role)) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'You do not have access to this route!',
      );
    }

    // Attach the user information to the request
    req.user = user;
    next();
  });
};

export default auth;
