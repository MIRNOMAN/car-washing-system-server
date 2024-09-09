"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const slot_service_1 = require("./slot.service");
const slot_validation_1 = require("./slot.validation");
const createSlotController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { service, date, startTime, endTime } = req.body;
    const serviceDuration = 60;
    const slots = yield slot_service_1.SlotServices.createSlots(service, date, startTime, endTime, serviceDuration);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'slots created successfully',
        data: slots,
    });
}));
const getSlotControllers = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate query params
    const { date, serviceId } = slot_validation_1.serviceValidation.getAvailableSlotsQuerySchema.parse(req.query);
    const slots = yield slot_service_1.SlotServices.getSlotsByDateAndServiceId({
        service: serviceId,
        date,
    });
    if (slots.length === 0) {
        return res.status(404).json({
            success: false,
            statusCode: 404,
            message: 'No Data Found',
            data: [],
        });
    }
    else {
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Available slots retrieved successfully',
            data: slots,
        });
    }
}));
exports.SlotControllers = {
    createSlotController,
    getSlotControllers,
};
