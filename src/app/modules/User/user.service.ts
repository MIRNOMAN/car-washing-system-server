/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { TUser } from './user.interface';
import { User } from './user.model';
import { AppError } from '../../error/appError';
import config from '../../config';
import { Admin } from '../Admin/admin.model';
import { TAdmin } from '../Admin/admin.interface';

const createUserIntoDB = async (payload: TUser) => {
  // Set default password if not provided
  if (!payload.password) {
    payload.password = config.default_password as string;
  }

  const userData = await User.create(payload);

  if (!userData) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
  }

  const { password, ...userWithoutPassword } = userData.toObject();

  return userWithoutPassword;
};

const createAdminIntoDB = async (payload: TAdmin) => {
  const adminData = await Admin.create(payload);

  if (!adminData) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
  }

  const { password, ...userWithoutPassword } = adminData.toObject();

  return userWithoutPassword;
};

export const UserServices = {
  createUserIntoDB,
};
