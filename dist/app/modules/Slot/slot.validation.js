"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceValidation = void 0;
const zod_1 = require("zod");
const createSlotSchema = zod_1.z.object({
    service: zod_1.z.string(),
    date: zod_1.z.string(),
    startTime: zod_1.z.string(),
    endTime: zod_1.z.string(),
    isBooked: zod_1.z.enum(['available', 'booked', 'canceled']),
});
const getAvailableSlotsQuerySchema = zod_1.z.object({
    date: zod_1.z.string().optional(),
    serviceId: zod_1.z.string().optional(),
});
exports.serviceValidation = {
    createSlotSchema,
    getAvailableSlotsQuerySchema
};
