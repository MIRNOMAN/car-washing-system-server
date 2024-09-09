"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const zod_1 = require("zod");
const handleZodError_1 = require("../error/handleZodError");
const handleValidationError_1 = require("../error/handleValidationError");
const handleCastError_1 = require("../error/handleCastError");
const handleDuplicateError_1 = require("../error/handleDuplicateError");
const appError_1 = require("../error/appError");
const config_1 = __importDefault(require("../config"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went wrong';
    let errorSources = [
        {
            path: '',
            message: 'Something went wrong',
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const simplyfiedError = (0, handleZodError_1.handleZodError)(err);
        statusCode = simplyfiedError === null || simplyfiedError === void 0 ? void 0 : simplyfiedError.statusCode;
        message = simplyfiedError === null || simplyfiedError === void 0 ? void 0 : simplyfiedError.message;
        errorSources = simplyfiedError === null || simplyfiedError === void 0 ? void 0 : simplyfiedError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        const simplyfiedError = (0, handleValidationError_1.handleValidationError)(err);
        statusCode = simplyfiedError === null || simplyfiedError === void 0 ? void 0 : simplyfiedError.statusCode;
        message = simplyfiedError === null || simplyfiedError === void 0 ? void 0 : simplyfiedError.message;
        errorSources = simplyfiedError === null || simplyfiedError === void 0 ? void 0 : simplyfiedError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        const simplyfiedError = (0, handleCastError_1.handleCastError)(err);
        statusCode = simplyfiedError === null || simplyfiedError === void 0 ? void 0 : simplyfiedError.statusCode;
        message = simplyfiedError === null || simplyfiedError === void 0 ? void 0 : simplyfiedError.message;
        errorSources = simplyfiedError === null || simplyfiedError === void 0 ? void 0 : simplyfiedError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const simplyfiedError = (0, handleDuplicateError_1.handleDuplicateError)(err);
        statusCode = simplyfiedError === null || simplyfiedError === void 0 ? void 0 : simplyfiedError.statusCode;
        message = simplyfiedError === null || simplyfiedError === void 0 ? void 0 : simplyfiedError.message;
        errorSources = simplyfiedError === null || simplyfiedError === void 0 ? void 0 : simplyfiedError.errorSources;
    }
    else if (err instanceof appError_1.AppError) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorSources = [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
        errorSources = [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        error: err,
        stack: config_1.default.NODE_ENV === 'development' ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.globalErrorHandler = globalErrorHandler;
