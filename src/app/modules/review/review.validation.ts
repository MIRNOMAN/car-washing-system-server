import { z } from 'zod'

const createReviewValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        invalid_type_error: 'Email must be a string',
      })
      .email('Invalid email format')
      .min(1, 'Email is required'),
    name: z
      .string({
        invalid_type_error: 'Name must be a string',
      })
      .min(1, 'Name is required'),
    rating: z
      .number({
        invalid_type_error: 'Rating must be a number',
      })
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating cannot exceed 5'),
    feedback: z
      .string({
        invalid_type_error: 'Feedback must be a string',
      })
      .min(1, 'Feedback is required'),
  }),
})

export const ReviewValidations = {
  createReviewValidationSchema,
}