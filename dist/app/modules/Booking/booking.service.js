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
exports.bookingService = void 0;
const service_model_1 = require("../Service/service.model");
const slot_model_1 = __importDefault(require("../Slot/slot.model"));
const user_model_1 = require("../User/user.model");
const booking_model_1 = __importDefault(require("./booking.model"));
const createBooking = (booking) => __awaiter(void 0, void 0, void 0, function* () {
    const slot = yield slot_model_1.default.findById(booking.slotId);
    const service = yield service_model_1.ServiceModel.findById(booking.serviceId);
    const user = yield user_model_1.UserModel.findById(booking.user);
    if (!slot || !service || !user) {
        throw new Error('Slot, service, or user not found');
    }
    if (slot && service && user) {
        const result = yield (yield (yield (yield booking_model_1.default.create({
            customer: user._id,
            service: service._id,
            slot: slot._id,
            vehicleType: booking.vehicleType,
            vehicleBrand: booking.vehicleBrand,
            vehicleModel: booking.vehicleModel,
            manufacturingYear: booking.manufacturingYear,
            registrationPlate: booking.registrationPlate,
            createdAt: new Date(),
            updatedAt: new Date(),
        })).populate('customer')).populate('service')).populate('slot');
        // Update the slot status to booked
        yield updateSlotBooking([slot._id]);
        return result;
    }
    else {
        throw new Error('Slot, service, or user not found');
    }
});
const updateSlotBooking = (slots) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield slot_model_1.default.updateMany({ _id: { $in: slots } }, { $set: { isBooked: true } });
    return result;
});
const getAllBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.default.find({})
        .populate('customer')
        .populate('service')
        .populate('slot');
    return result;
});
const getMyBookings = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.default.find({ customer: userId })
        .populate('service')
        .populate('slot');
    return result;
});
const updateBookingById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.default.findByIdAndUpdate(id, data, { new: true });
    return result;
});
const getBookingById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.default.findById(id)
        .populate('customer')
        .populate('service')
        .populate('slot');
    return result;
});
exports.bookingService = {
    createBooking,
    updateSlotBooking,
    getAllBookings,
    getMyBookings,
    updateBookingById,
    getBookingById,
};
