import express from 'express';
import { SlotControllers } from './slot.controller';

const router = express.Router();

router.post('/', SlotControllers.createSlotController);

export const slotRoutes = router;
