/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import { TAuth, TUser } from './user.interface';
import { AppError } from '../../error/appError';
import config from '../../config';
import { UserModel } from './user.model';
import bcrypt from 'bcrypt';
import { createToken } from './user.utils';
import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const createUserIntoDB = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  const savedUser = await UserModel.findById(result._id, '-isDeleted')
    .select('-password')
    .exec();
  return savedUser;
};


const getFullUserDataFormDb = async (email: string, next: NextFunction) => {
  try {
      const user = await UserModel.findOne({ email });
      if (user) {
          return {
              success: true,
              statusCode: httpStatus.OK,
              message: 'User retrieved successfully',
              data: user
          };
      }
  } catch (error) {
      next(error);
  }
};



const getUserForRecoverAccountFormDb = async (email: string, next: NextFunction) => {
  try {
      const user: TUser | null = await UserModel.findOne({ email });

      if (user) {
          const token = jwt.sign({ email: user.email }, config.jwt_access_secret as string, { expiresIn: '15m' });

          if (!token) {
              return {
                  success: false,
                  statusCode: httpStatus.OK,
                  message: 'Something went wrong',
                  data: []
              };
          }

          const resBody = {
              name: user.name,
              email: user.email,
              token,
          };

          return {
              success: true,
              statusCode: httpStatus.OK,
              message: 'User retrieved successfully',
              data: resBody
          };
      } else {
          return {
              success: false,
              statusCode: httpStatus.OK,
              message: 'User not found',
              data: []
          };
      }
  } catch (error) {
      next(error);
  }
};


const SigninIntoDB = async (payload: TAuth) => {
  // const {email} = payload
  const findUser = await UserModel.findOne(
    { email: payload.email },
    '-isDeleted',
  );
  // console.log(findUser)
  if (!findUser) {
    throw new AppError(httpStatus.NOT_FOUND, "Couldn't found the account");
  }
  //  checking if the user already deleted

  const isDeleted = findUser.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This account is already deleted');
  }
  // checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    findUser.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.NOT_FOUND, "Password doesn't matched");
  }
  const { password, ...userWithoutEmail } = findUser.toObject();
  const jwtPayload = userWithoutEmail;

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '1hr',
  );

  // const refreshToken = createToken(
  //   jwtPayload,
  //   config.secret_access_token as string,
  //   "1hr"
  // );
  return { data: userWithoutEmail, token: accessToken };
};

export const UserServices = {
  createUserIntoDB,
  SigninIntoDB,
  getFullUserDataFormDb,
  getUserForRecoverAccountFormDb
};
