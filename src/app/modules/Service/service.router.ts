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

const router = express.Router();

router.post('/', authMiddleware, adminMiddleware, createService);
router.get('/:id', getServiceController);
router.get('/', getAllServices);
router.put(
  '/:id',
  validateRequest(updateServiceSchema),
  updateServiceController,
);

router.delete(
  '/:id',
  validateRequest(updateServiceSchema),
  deleteServiceController,
);

export const serviceRoute = router;
