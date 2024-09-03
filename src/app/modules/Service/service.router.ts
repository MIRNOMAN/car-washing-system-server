import express from 'express';
import {
  createService,
  getAllServices,
  getServiceController,
  updateServiceController,
} from './service.controller';
import { adminMiddleware, authMiddleware } from './service.adminAuthorization';

const router = express.Router();

router.post('/services', authMiddleware, adminMiddleware, createService);
router.get('/services/:id', getServiceController);
router.get('/services', getAllServices);
router.put(
  '/services/:id',
  authMiddleware,
  adminMiddleware,
  updateServiceController,
);

export const serviceRoute = router;
