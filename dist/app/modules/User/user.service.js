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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = require("../../error/appError");
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("./user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_utils_1 = require("./user.utils");
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.create(payload);
    const savedUser = yield user_model_1.UserModel.findById(result._id, '-isDeleted')
        .select('-password')
        .exec();
    return savedUser;
});
const SigninIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // const {email} = payload
    const findUser = yield user_model_1.UserModel.findOne({ email: payload.email }, '-isDeleted');
    // console.log(findUser)
    if (!findUser) {
        throw new appError_1.AppError(http_status_1.default.NOT_FOUND, "Couldn't found the account");
    }
    //  checking if the user already deleted
    const isDeleted = findUser.isDeleted;
    if (isDeleted) {
        throw new appError_1.AppError(http_status_1.default.FORBIDDEN, 'This account is already deleted');
    }
    // checking if the password is correct
    const isPasswordMatched = yield bcrypt_1.default.compare(payload.password, findUser.password);
    if (!isPasswordMatched) {
        throw new appError_1.AppError(http_status_1.default.NOT_FOUND, "Password doesn't matched");
    }
    const _a = findUser.toObject(), { password } = _a, userWithoutEmail = __rest(_a, ["password"]);
    const jwtPayload = userWithoutEmail;
    const accessToken = (0, user_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, '1hr');
    // const refreshToken = createToken(
    //   jwtPayload,
    //   config.secret_access_token as string,
    //   "1hr"
    // );
    return { data: userWithoutEmail, token: accessToken };
});
exports.UserServices = {
    createUserIntoDB,
    SigninIntoDB,
};
