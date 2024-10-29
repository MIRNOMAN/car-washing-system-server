import { z } from 'zod'

const createServiceValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Name must be a string',
      })
      .min(1, 'Name is required'),
    description: z
      .string({
        invalid_type_error: 'Description must be a string',
      })
      .min(1, 'Description is required'),
    price: z
      .number({
        invalid_type_error: 'Price must be a number',
      })
      .min(0, 'Price must be at least 0'),
    duration: z
      .number({
        invalid_type_error: 'Duration must be a number',
      })
      .min(1, 'Duration must be at least 1 minute'),
    isDeleted: z
      .boolean({
        invalid_type_error: 'isDeleted must be a boolean',
      })
      .default(false),
  }),
})

const updateServiceValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Name must be a string',
      })
      .min(1, 'Name is required')
      .optional(),
    description: z
      .string({
        invalid_type_error: 'Description must be a string',
      })
      .min(1, 'Description is required')
      .optional(),
    price: z
      .number({
        invalid_type_error: 'Price must be a number',
      })
      .min(0, 'Price must be at least 0')
      .optional(),
    duration: z
      .number({
        invalid_type_error: 'Duration must be a number',
      })
      .min(1, 'Duration must be at least 1 minute')
      .optional(),
    isDeleted: z
      .boolean({
        invalid_type_error: 'isDeleted must be a boolean',
      })
      .optional(),
  }),
})

export const ServiceValidations = {
  createServiceValidationSchema,
  updateServiceValidationSchema,
}