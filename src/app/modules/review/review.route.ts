import express from 'express'
import { ReviewControllers } from './review.controller'
import validateRequest from '../../middlewares/validateRequest'
import { ReviewValidations } from './review.validation'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../User/user.constant'


const router = express.Router()
// review routes
router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(ReviewValidations.createReviewValidationSchema),
  ReviewControllers.createReview,
)
router.get('/', ReviewControllers.getReviews)

export const ReviewRoutes = router