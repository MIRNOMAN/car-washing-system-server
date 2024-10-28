/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import httpStatus from "http-status";
import config from "../../config";
import { TUser, TUserLogin } from "./user.interface";
import { UserModel } from "./user.model";
import { createToken } from "../../middlewares/auth.utils";
import { AppError } from "../../error/appError";
import QueryBuilder from "../../builder/QueryBuilder";


// signup
const createUserIntoDB = async (payload: TUser) => {
  if (!payload.password) {
    payload.password = config.default_password as string;
  }
  const result = await UserModel.create(payload);
  const { password, ...userWithoutPassword } = result.toObject();
  return userWithoutPassword;
};
const updateUserRole = async (id: string, payload: Partial<TUser>) => {
  // Check if the user exists
  const user = await UserModel.findById(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // Check if the new status is valid
  if (!["user", "admin"].includes(payload.role as string)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid status");
  }

  // Update role
  const result = await UserModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const updateUserProfile = async (id: string, payload: Partial<TUser>) => {
  // Check if the user exists
  const user = await UserModel.findById(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  // Update role
  const result = await UserModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const getAllUserFromDB = async (queryParams: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(UserModel.find(), queryParams);
  userQuery.search(["name"]).filter().sort().paginate().fields();
  const result = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();
  return { result, meta };
};

// login
const loginUser = async (payload: TUserLogin) => {
  // check if user exist or nto
  const user = await UserModel.isUserExistByCustomEmail(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }
  //   check if the password is matched or not ?
  if (!(await UserModel.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password Does not match");
  }

  // create token and send to the user
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );
  const result = { accessToken, user };
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  loginUser,
  updateUserRole,
  updateUserProfile,
};