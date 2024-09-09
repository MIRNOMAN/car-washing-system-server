"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
    phone: zod_1.z.string(),
    address: zod_1.z.string(),
    role: zod_1.z.enum(['user', 'admin']),
    isDeleted: zod_1.z.boolean().default(false),
});
const AuthValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
exports.UserValidation = {
    userValidationSchema,
    AuthValidationSchema,
};
