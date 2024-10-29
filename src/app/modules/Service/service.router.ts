import express from 'express'
import { serviceControllers } from './service.controller'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { ServiceValidations } from './service.validation'
import { USER_ROLE } from '../User/user.constant'
import { SlotValidations } from '../Slot/slot.validation'
import { slotController } from '../Slot/slot.controller'


const router = express.Router()
// service creating route
router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(ServiceValidations.createServiceValidationSchema),
  serviceControllers.createService,
)
router.get('/:id', serviceControllers.getSingleService)
router.get('/details/:id', serviceControllers.getSingleServiceDetails)
router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(ServiceValidations.updateServiceValidationSchema),
  serviceControllers.updateService,
)
router.delete('/:id', auth(USER_ROLE.admin), serviceControllers.deleteService)
router.get('/', serviceControllers.getAllServices)
router.post(
  '/slots',
  auth(USER_ROLE.admin),
  validateRequest(SlotValidations.createSlotValidationSchema),
  slotController.createSlot,
)

export const ServiceRoutes = router