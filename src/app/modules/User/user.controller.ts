/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from "express";
import { UserServices } from "./user.service";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await UserServices.createUserIntoDB(userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});
const getAllUser = catchAsync(async (req, res) => {
  const queryParams = req.query;
  const result = await UserServices.getAllUserFromDB(queryParams);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All User is retrieved",
    data: result.result,
    meta: result.meta,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await UserServices.loginUser(req.body);
  const { accessToken: token, user } = result;
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: { token, user },
  });
});
const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.updateUserRole(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User role updated successfully",
    data: result,
  });
});
const updateUserProfile = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.updateUserProfile(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile updated successfully",
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUser,
  loginUser,
  updateUser,
  updateUserProfile,
};