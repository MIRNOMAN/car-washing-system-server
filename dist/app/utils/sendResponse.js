"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponseWithToken = exports.sendResponse = void 0;
const sendResponse = (res, data) => {
    res.status(data === null || data === void 0 ? void 0 : data.statusCode).json({
        success: data.success,
        statusCode: data === null || data === void 0 ? void 0 : data.statusCode,
        message: data.message,
        token: data.token,
        data: data.data,
    });
};
exports.sendResponse = sendResponse;
const sendResponseWithToken = (res, data) => {
    res.status(data === null || data === void 0 ? void 0 : data.statusCode).json({
        success: data.success,
        statusCode: data.statusCode,
        message: data.message,
        token: data.token,
        data: data.data,
    });
};
exports.sendResponseWithToken = sendResponseWithToken;
