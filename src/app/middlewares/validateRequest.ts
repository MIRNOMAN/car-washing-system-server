import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, ZodError } from 'zod'
import httpStatus from 'http-status'

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      })
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map((err) => ({
          path: err.path.slice(1).join('.'),
          message: err.message,
        }))
        
        res.status(httpStatus.BAD_REQUEST).json({
          success: false,
          message: 'Validation error',
          errorSources: formattedErrors,
        })
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: 'An unexpected error occurred',
        })
      }
    }
  }
}

export default validateRequest
