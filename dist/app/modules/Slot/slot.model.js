"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const slotSchema = new mongoose_1.Schema({
    service: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Service', required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isBooked: {
        type: String,
        enum: ['available', 'booked', 'canceled'],
        default: 'available',
        required: true,
    },
}, {
    timestamps: true,
});
const SlotModel = (0, mongoose_1.model)('Slot', slotSchema);
exports.default = SlotModel;
