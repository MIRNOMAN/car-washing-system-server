"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRoute = void 0;
const express_1 = __importDefault(require("express"));
const service_controller_1 = require("./service.controller");
const service_adminAuthorization_1 = require("./service.adminAuthorization");
const service_validation_1 = require("./service.validation");
const validateRequest_1 = require("../../middlewares/validateRequest");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)('admin'), service_adminAuthorization_1.authMiddleware, service_adminAuthorization_1.adminMiddleware, service_controller_1.createService);
router.get('/:id', service_controller_1.getServiceController);
router.get('/', service_controller_1.getAllServices);
router.put('/:id', (0, auth_1.default)('admin'), (0, validateRequest_1.validateRequest)(service_validation_1.updateServiceSchema), service_controller_1.updateServiceController);
router.delete('/:id', (0, auth_1.default)('admin'), (0, validateRequest_1.validateRequest)(service_validation_1.updateServiceSchema), service_controller_1.deleteServiceController);
exports.serviceRoute = router;
