"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middlewares/validateRequest");
const user_validation_1 = require("./user.validation");
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.validateRequest)(user_validation_1.UserValidation.userValidationSchema), user_controller_1.UserControllers.createUser);
router.post('/login', (0, validateRequest_1.validateRequest)(user_validation_1.UserValidation.AuthValidationSchema), user_controller_1.UserControllers.SignInUser);
exports.AuthRoutes = router;
