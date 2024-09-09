"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingSchema = void 0;
const zod_1 = require("zod");
exports.bookingSchema = zod_1.z.object({
    serviceId: zod_1.z.string(),
    slotId: zod_1.z.string(),
    vehicleType: zod_1.z.string(),
    vehicleBrand: zod_1.z.string(),
    vehicleModel: zod_1.z.string(),
    manufacturingYear: zod_1.z.number().min(1886).max(new Date().getFullYear()),
    registrationPlate: zod_1.z.string(),
});
