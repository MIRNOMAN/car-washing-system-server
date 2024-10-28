/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from "express";
import httpStatus from "http-status";
import { Services } from "./service.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createService: RequestHandler = catchAsync(async (req, res) => {
  const serviceData = req.body;
  const result = await Services.createServiceIntoDB(serviceData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service created successfully",
    data: result,
  });
});

const getAllServices = catchAsync(async (req, res) => {
  const queryParams = req.query;
  const result = await Services.getAllServices(queryParams);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Services retrieved successfully",
    data: result.result,
    // meta: result.meta,
  });
});
const getSingleServices = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await Services.getSingleServices(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Services retrieved successfully",
    data: result,
  });
});

const updateSingleService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await Services.updateService(id, updatedData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service updated successfully",
    data: result,
  });
});
const deleteSingleService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await Services.deleteService(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service deleted successfully",
    data: result,
  });
});

export const ServiceController = {
  createService,
  getAllServices,
  getSingleServices,
  updateSingleService,
  deleteSingleService,
};