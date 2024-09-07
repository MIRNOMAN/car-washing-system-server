/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
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
    const token = req.headers.authorization?.split(' ')[1];

    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    } catch (err) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid token!');
    }

    const { name, email, role, phone, address, isDeleted } = decoded;

    // checking if the user is exist
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    const DeletedUser = user.isDeleted;
    if (DeletedUser) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'This user is no longer deleted',
      );
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'You have no access to this route',
      });
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
