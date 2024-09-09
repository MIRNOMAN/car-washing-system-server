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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteServiceController = exports.updateServiceController = exports.getAllServices = exports.getServiceController = exports.createService = void 0;
const service_validation_1 = require("./service.validation");
const catchAsync_1 = require("../../utils/catchAsync");
const service_service_1 = require("./service.service");
exports.createService = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = service_validation_1.createServiceSchema.parse(req.body);
        const service = yield service_service_1.serviceService.createService(validatedData);
        if (!service) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: 'service not found',
                data: [],
            });
        }
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Service created successfully',
            data: service,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: error instanceof Error ? error.message : 'Validation error',
        });
    }
}));
exports.getServiceController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const service = yield service_service_1.serviceService.getServiceById(id);
    if (!service) {
        return res.status(404).json({
            success: false,
            statusCode: 404,
            message: 'service not found',
            data: [],
        });
    }
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Service retrieved successfully',
        data: service,
    });
}));
exports.getAllServices = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.serviceService.getAllServiceFromDB();
    if (!result) {
        return res.status(404).json({
            success: false,
            statusCode: 404,
            message: 'service not found',
            data: [],
        });
    }
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Services retrieved successfully',
        data: result,
    });
}));
exports.updateServiceController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updates = service_validation_1.updateServiceSchema.parse(req.body);
    const updatedService = yield service_service_1.serviceService.updateServiceById(id, updates);
    if (!updatedService) {
        return res.status(404).json({
            success: false,
            statusCode: 404,
            message: 'service not found',
            data: [],
        });
    }
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Service updated successfully',
        data: updatedService,
    });
}));
exports.deleteServiceController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteService = yield service_service_1.serviceService.deleteServiceById({
        params: { id: req.params.id },
    });
    if (!deleteService) {
        return res.status(404).json({
            success: false,
            statusCode: 404,
            message: 'service not found',
            data: [],
        });
    }
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Service updated successfully',
        data: deleteService,
    });
}));
