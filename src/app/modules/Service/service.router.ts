import express from 'express';
import {
  createService,
  deleteServiceController,
  getAllServices,
  getServiceController,
  updateServiceController,
} from './service.controller';
import { adminMiddleware, authMiddleware } from './service.adminAuthorization';
import { updateServiceSchema } from './service.validation';
import { validateRequest } from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { serviceValidation } from '../Slot/slot.validation';
import { SlotControllers } from '../Slot/slot.controller';

const router = express.Router();

router.post('/', auth('admin'), authMiddleware, adminMiddleware, createService);
router.get('/:id', getServiceController);
router.get('/', getAllServices);
router.put(
  '/:id',
  auth('admin'),
  validateRequest(updateServiceSchema),
  updateServiceController,
);

router.delete(
  '/:id',
  auth('admin'),
  validateRequest(updateServiceSchema),
  deleteServiceController,
);

router.post(
  '/slots',
  auth('admin'),
  validateRequest(serviceValidation.getAvailableSlotsQuerySchema),
  SlotControllers.createSlotController,
);

export const serviceRoute = router;
