"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteServiceSchema = exports.updateServiceSchema = exports.createServiceSchema = void 0;
const zod_1 = require("zod");
exports.createServiceSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Service name is required'),
    description: zod_1.z.string().min(1, 'Service description is required'),
    price: zod_1.z.number().positive('Price must be a positive number'),
    duration: zod_1.z.number().positive('Duration must be a positive number'),
    isDeleted: zod_1.z.boolean(),
});
exports.updateServiceSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    price: zod_1.z.number().positive('Price must be a positive number').optional(),
    duration: zod_1.z
        .number()
        .positive('Duration must be a positive number')
        .optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
exports.deleteServiceSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().nonempty('Service ID is required'),
    }),
});
