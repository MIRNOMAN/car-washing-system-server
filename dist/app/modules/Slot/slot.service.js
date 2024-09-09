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
exports.SlotServices = exports.createSlots = void 0;
const slot_model_1 = __importDefault(require("./slot.model"));
const createSlots = (service, date, startTime, endTime, serviceDuration) => __awaiter(void 0, void 0, void 0, function* () {
    const start = convertTimeToMinutes(startTime);
    const end = convertTimeToMinutes(endTime);
    const totalDuration = end - start;
    const numberOfSlots = totalDuration / serviceDuration;
    const slots = [];
    for (let i = 0; i < numberOfSlots; i++) {
        const slotStartTime = convertMinutesToTime(start + i * serviceDuration);
        const slotEndTime = convertMinutesToTime(start + (i + 1) * serviceDuration);
        const newSlot = new slot_model_1.default({
            service,
            date,
            startTime: slotStartTime,
            endTime: slotEndTime,
            isBooked: 'available',
        });
        const savedSlot = yield newSlot.save();
        slots.push(savedSlot);
    }
    return slots;
});
exports.createSlots = createSlots;
const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};
const convertMinutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60)
        .toString()
        .padStart(2, '0');
    const mins = (minutes % 60).toString().padStart(2, '0');
    return `${hours}:${mins}`;
};
const getSlotsByDateAndServiceId = (_a) => __awaiter(void 0, [_a], void 0, function* ({ service, date, }) {
    const query = {}; // Use 'date' here
    if (service) {
        query.service = service;
    }
    if (date) {
        query.date = new Date(date); // Convert date string to Date object
    }
    const result = yield slot_model_1.default.find(query).populate('service');
    return result;
});
exports.SlotServices = {
    createSlots: exports.createSlots,
    getSlotsByDateAndServiceId,
};
