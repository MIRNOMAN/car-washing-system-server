"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const handleValidationError = (err) => {
    const errorSources = Object.values(err.errors).map((val) => {
        return {
            path: val.path,
            message: val.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'validation error',
        errorSources,
    };
};
exports.handleValidationError = handleValidationError;
