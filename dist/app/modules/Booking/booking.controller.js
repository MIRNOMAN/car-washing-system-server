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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const booking_service_1 = require("./booking.service");
const createBooking = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id; // Assuming you have user information from JWT in req.user
        const { serviceId, slotId, vehicleType, vehicleBrand, vehicleModel, manufacturingYear, registrationPlate, } = req.body;
        if (!userId) {
            return res.status(401).json({
                success: false,
                statusCode: http_status_1.default.UNAUTHORIZED,
                message: 'Unauthorized: User not found',
            });
        }
        const booking = yield booking_service_1.bookingService.createBooking({
            serviceId,
            slotId,
            user: userId.toString(),
            vehicleType,
            vehicleBrand,
            vehicleModel,
            manufacturingYear,
            registrationPlate,
        });
        if (booking) {
            return res.status(200).json({
                success: true,
                statusCode: http_status_1.default.OK,
                message: 'Booking successful',
                data: booking,
            });
        }
        else {
            return res.status(400).json({
                success: false,
                statusCode: http_status_1.default.BAD_REQUEST,
                message: 'Failed to create booking',
            });
        }
    }
    catch (error) {
        // console.error(error);
        return res.status(500).json({
            success: false,
            statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
        });
    }
}));
const getAllBookings = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield booking_service_1.bookingService.getAllBookings();
        return res.status(200).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'All bookings retrieved successfully',
            data: bookings,
        });
    }
    catch (error) {
        // console.error(error);
        return res.status(500).json({
            success: false,
            statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
        });
    }
}));
const getMyBookings = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id; // Assuming you have user information from JWT in req.user
        if (!userId) {
            return res.status(401).json({
                success: false,
                statusCode: http_status_1.default.UNAUTHORIZED,
                message: 'Unauthorized: User not found',
            });
        }
        const bookings = yield booking_service_1.bookingService.getMyBookings(userId.toString());
        return res.status(200).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'User bookings retrieved successfully',
            data: bookings,
        });
    }
    catch (error) {
        // console.error(error);
        return res.status(500).json({
            success: false,
            statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
        });
    }
}));
const updateBooking = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedBooking = yield booking_service_1.bookingService.updateBookingById(id, updateData);
        if (updatedBooking) {
            return res.status(200).json({
                success: true,
                statusCode: http_status_1.default.OK,
                message: 'Booking updated successfully',
                data: updatedBooking,
            });
        }
        else {
            return res.status(404).json({
                success: false,
                statusCode: http_status_1.default.NOT_FOUND,
                message: 'Booking not found',
            });
        }
    }
    catch (error) {
        // console.error(error);
        return res.status(500).json({
            success: false,
            statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
        });
    }
}));
const getBooking = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const booking = yield booking_service_1.bookingService.getBookingById(id);
        if (booking) {
            return res.status(200).json({
                success: true,
                statusCode: http_status_1.default.OK,
                message: 'Booking retrieved successfully',
                data: booking,
            });
        }
        else {
            return res.status(404).json({
                success: false,
                statusCode: http_status_1.default.NOT_FOUND,
                message: 'Booking not found',
            });
        }
    }
    catch (error) {
        // console.error(error);
        return res.status(500).json({
            success: false,
            statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
        });
    }
}));
exports.bookingController = {
    createBooking,
    getAllBookings,
    getMyBookings,
    updateBooking,
    getBooking,
};
