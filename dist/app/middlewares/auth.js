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
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchAsync_1 = require("../utils/catchAsync");
const appError_1 = require("../error/appError");
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../modules/User/user.model");
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Check if the authorization header exists
        if (!req.headers.authorization) {
            throw new appError_1.AppError(http_status_1.default.UNAUTHORIZED, 'Authorization header is missing!');
        }
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new appError_1.AppError(http_status_1.default.UNAUTHORIZED, 'Token is missing!');
        }
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
            // console.log('Decoded JWT:', decoded);
        }
        catch (err) {
            // console.error('JWT verification failed:', err);
            throw new appError_1.AppError(http_status_1.default.UNAUTHORIZED, 'Invalid or expired token!');
        }
        const { email } = decoded;
        // Check if the user exists
        const user = yield user_model_1.UserModel.findOne({ email });
        if (!user) {
            throw new appError_1.AppError(http_status_1.default.NOT_FOUND, 'User not found!');
        }
        // Check if the user is deleted
        if (user.isDeleted) {
            throw new appError_1.AppError(http_status_1.default.FORBIDDEN, 'This user has been deleted!');
        }
        // Check if the user has the required role
        if (requiredRoles.length && !requiredRoles.includes(user.role)) {
            throw new appError_1.AppError(http_status_1.default.FORBIDDEN, 'You do not have access to this route!');
        }
        // Attach the user information to the request
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
