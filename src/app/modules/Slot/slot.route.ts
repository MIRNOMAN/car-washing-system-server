import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import Auth from '../../middlewares/auth';
import { SlotValidations } from './slot.validation';
import { SlotController } from './slot.controller';

const router = express.Router();

router.post(
  "/create-slot",
  Auth("admin"),
  validateRequest(SlotValidations.createSlotValidationSchema),
  SlotController.createSlot
);

router.get("/availability", SlotController.getAllAvailableSlots);
router.get("/", SlotController.getAllSlots);
router.get("/:id", SlotController.getSingleSlots);
router.patch(
  "/:id",
  Auth("admin"),

  SlotController.updateSingleSlot
);
export const slotRoutes = router;
