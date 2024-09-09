"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = require("../../middlewares/validateRequest");
const booking_controller_1 = require("./booking.controller");
const booking_validation_1 = require("./booking.validation");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)('user'), (0, validateRequest_1.validateRequest)(booking_validation_1.bookingSchema), booking_controller_1.bookingController.createBooking);
router.get('/my-bookings', (0, auth_1.default)('user'), booking_controller_1.bookingController.getMyBookings);
router.get('/', (0, auth_1.default)('admin'), booking_controller_1.bookingController.getAllBookings);
// router.get('/', bookingController.GetCar);
// router.get('/:id',bookingController.GetCarById)
// router.delete('/:id',bookingController.DeleteCar)
// router.put('/:id',auth("admin"),validateRequest(CarValidation.UpdateCarValidationSchema),bookingController.UpdateCar)
exports.BookingRoutes = router;
