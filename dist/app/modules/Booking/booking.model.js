"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Define the Booking schema
const BookingSchema = new mongoose_1.Schema({
    customer: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'User' }, // Reference to the user
    service: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Service' }, // Reference to the service
    slot: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Slot' }, // Reference to the slot
    vehicleType: {
        type: String,
        required: true,
        enum: [
            'car',
            'truck',
            'SUV',
            'van',
            'motorcycle',
            'bus',
            'electricVehicle',
            'hybridVehicle',
            'bicycle',
            'tractor',
        ],
    },
    vehicleBrand: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    manufacturingYear: { type: Number, required: true },
    registrationPlate: { type: String, required: true },
}, {
    timestamps: true, // This will add createdAt and updatedAt fields
});
const BookingModel = mongoose_1.default.model('Booking', BookingSchema);
exports.default = BookingModel;
