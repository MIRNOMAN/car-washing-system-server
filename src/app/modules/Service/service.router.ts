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
import { authenticateAdmin } from '../Slot/slot.adminAuthentication';
import { createSlotController } from '../Slot/slot.controller';

const router = express.Router();

router.post('/services', authMiddleware, adminMiddleware, createService);
router.get('/services/:id', getServiceController);
router.get('/services', getAllServices);
router.put(
  '/services/:id',
  validateRequest(updateServiceSchema),
  updateServiceController,
);

router.delete(
  '/services/:id',
  validateRequest(updateServiceSchema),
  deleteServiceController,
);

router.post('/services/slots', authenticateAdmin, createSlotController);

export const serviceRoute = router;
