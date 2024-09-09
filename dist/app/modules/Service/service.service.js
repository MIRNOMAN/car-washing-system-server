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
exports.serviceService = void 0;
const mongoose_1 = require("mongoose");
const service_model_1 = require("./service.model");
const createService = (serviceData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.ServiceModel.create(serviceData);
    return result;
});
const getServiceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield service_model_1.ServiceModel.findById(id);
    if (!service) {
        throw new mongoose_1.Error('Service not found');
    }
    return service;
});
const getAllServiceFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.ServiceModel.find({ isDeleted: false });
    return result;
});
const updateServiceById = (serviceId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.ServiceModel.findByIdAndUpdate(serviceId, updateData, {
        new: true,
    });
    return result;
});
const deleteServiceById = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = input.params;
    const service = yield service_model_1.ServiceModel.findById(id);
    if (!service) {
        throw new mongoose_1.Error('Service not found');
    }
    service.isDeleted = true; // Soft delete
    yield service.save();
    return service;
});
exports.serviceService = {
    createService,
    getServiceById,
    updateServiceById,
    deleteServiceById,
    getAllServiceFromDB,
};
