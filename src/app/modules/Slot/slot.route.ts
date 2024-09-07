import express from 'express';
import { SlotControllers } from './slot.controller';

const router = express.Router();

router.post('/', SlotControllers.createSlotController);
router.get('/availability', SlotControllers.getSlotControllers);

export const slotRoutes = router;
