/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import { TAuth, TUser } from './user.interface';
import { AppError } from '../../error/appError';
import config from '../../config';
import { UserModel } from './user.model';
import bcrypt from 'bcrypt';
import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import verifyTokenSync from '../../utils/verifyTokenSync';

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



const recoverAccountFromDb = async (payload: { token: string, newPassword: string }, next: NextFunction) => {
  try {
      const decoded = verifyTokenSync(payload.token, config.jwt_access_secret as string);

      if (!decoded || !decoded.email) {
          return {
              success: false,
              message: 'OTP Expired',
          };
      }

      const email = decoded.email;
      const encryptedNewPassword = await bcrypt.hash(payload.newPassword, Number(config.bcrypt_slat_rounds));

      if (!encryptedNewPassword) {
          return {
              success: false,
              message: 'Something went wrong while encrypting the password',
          };
      }

      const updateUser = await UserModel.findOneAndUpdate({ email }, { password: encryptedNewPassword });

      if (!updateUser) {
          return {
              success: false,
              message: 'User update failed',
          };
      }

      return {
          success: true,
          message: 'Account recovered successfully',
      };

  } catch (error) {
      next(error);
  }
};


const updateSpecificUserIntoDb = async (payload: Partial<TUser>, email: string, next: NextFunction) => {
  try {
      const updatedUser = await UserModel.findOneAndUpdate({ email }, payload, { new: true });

      if (updatedUser) {
          return {
              success: true,
              statusCode: httpStatus.OK,
              message: 'User updated successfully',
              data: updatedUser,
          };
      } else {
          return {
              success: false,
              statusCode: httpStatus.NOT_FOUND,
              message: 'User not found',
          };
      }
  } catch (error) {
      next(error);
  }
};



const getRoleBaseUserFormDb = async (role: string, next: NextFunction) => {
  try {
      const users = await UserModel.find({ role });

      if (users.length > 0) {
          return {
              success: true,
              statusCode: httpStatus.OK,
              message: `${role}s retrieved successfully`,
              data: users,
          };
      } else {
          return {
              success: false,
              statusCode: httpStatus.NOT_FOUND,
              message: `No users found with the role: ${role}`,
          };
      }
  } catch (error) {
      next(error);
  }
};


const changeUserRoleIntoDb = async (payload: { _id: string; role: string }, next: NextFunction) => {
  try {
      const updatedUser = await UserModel.findByIdAndUpdate(payload._id, { role: payload.role }, { new: true });

      if (updatedUser) {
          return {
              success: true,
              statusCode: httpStatus.OK,
              message: `User role changed to ${payload.role}`,
              data: updatedUser,
          };
      } else {
          return {
              success: false,
              statusCode: httpStatus.NOT_FOUND,
              message: 'User not found',
          };
      }
  } catch (error) {
      next(error);
  }
};



const SigninIntoDB = async (payload: TAuth, next: NextFunction) => {
  try {
      // Find the user by email and include the password field
      const user = await UserModel.findOne({ email: payload.email },'-isDeleted').select('+password');

      if (!user) {
          return {
              success: false,
              statusCode: httpStatus.BAD_REQUEST,
              message: 'The email you provided did not match any accounts',
              data: null,
              token: null,
          };
      }

      // Verify the password
      const isPasswordCorrect = await bcrypt.compare(payload.password, user.password);
      if (!isPasswordCorrect) {
          return {
              success: false,
              statusCode: httpStatus.BAD_REQUEST,
              message: 'Wrong password',
              data: null,
              token: null,
          };
      }

      // Create JWT payload
      const tokenPayload = { user: user.email, role: user.role };

      // Generate access and refresh tokens
      const accessToken = jwt.sign(tokenPayload, config.jwt_access_secret as string, { expiresIn: '3d' });
      const refreshToken = jwt.sign(tokenPayload, config.jwt_refresh_secret as string, { expiresIn: '365d' });

      if (!accessToken || !refreshToken) {
          return {
              success: false,
              statusCode: httpStatus.INTERNAL_SERVER_ERROR,
              message: 'Error generating tokens',
              data: null,
              token: null,
          };
      }

      // Return user data excluding password
      const userForClient = await UserModel.findOne({ email: payload.email });

      return {
          success: true,
          statusCode: httpStatus.OK,
          message: 'User logged in successfully',
          data: userForClient,
          accessToken,
          refreshToken,
      };
  } catch (error) {
      next(error);
  }
};



export const UserServices = {
  createUserIntoDB,
  SigninIntoDB,
  getFullUserDataFormDb,
  getUserForRecoverAccountFormDb,
  recoverAccountFromDb,
  updateSpecificUserIntoDb,
  getRoleBaseUserFormDb,
  changeUserRoleIntoDb
};
