import express from 'express'
import { slotController } from './slot.controller'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { SlotValidations } from './slot.validation'
import { USER_ROLE } from '../User/user.constant'

const router = express.Router()

router.get('/availability', slotController.getAvailableSlots)
router.get('/all-slots', slotController.getAllSlots)
router.put(
  '/update-slot/:id',
  auth(USER_ROLE.admin),
  validateRequest(SlotValidations.updateSlotValidationSchema),
  slotController.updateSlot,
)

export const SlotRoutes = router