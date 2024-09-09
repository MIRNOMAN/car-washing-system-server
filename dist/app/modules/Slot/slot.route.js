"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotRoutes = void 0;
const express_1 = __importDefault(require("express"));
const slot_controller_1 = require("./slot.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const slot_validation_1 = require("./slot.validation");
const router = express_1.default.Router();
// router.post(
//   '/',
//   auth('admin'),
//   validateRequest(serviceValidation.getAvailableSlotsQuerySchema),
//   SlotControllers.createSlotController,
// );
router.get('/availability', (0, validateRequest_1.validateRequest)(slot_validation_1.serviceValidation.getAvailableSlotsQuerySchema), slot_controller_1.SlotControllers.getSlotControllers);
exports.slotRoutes = router;
