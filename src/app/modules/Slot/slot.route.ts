import express from 'express';
import { SlotControllers } from './slot.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { serviceValidation } from './slot.validation';

const router = express.Router();

// router.post(
//   '/',
//   auth('admin'),
//   validateRequest(serviceValidation.getAvailableSlotsQuerySchema),
//   SlotControllers.createSlotController,
// );
router.get(
  '/availability',
  validateRequest(serviceValidation.getAvailableSlotsQuerySchema),
  SlotControllers.getSlotControllers,
);

export const slotRoutes = router;
