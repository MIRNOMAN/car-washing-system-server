import express from 'express';
import {
  createService,
  deleteServiceController,
  getAllServices,
  getServiceController,
  updateServiceController,
} from './service.controller';
import { adminMiddleware, authMiddleware } from './service.adminAuthorization';
import { createServiceSchema, updateServiceSchema } from './service.validation';
import { validateRequest } from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/', authMiddleware, adminMiddleware, createService);
router.get('/:id', validateRequest(createServiceSchema), getServiceController);
router.get('/', validateRequest(createServiceSchema), getAllServices);
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

export const serviceRoute = router;
