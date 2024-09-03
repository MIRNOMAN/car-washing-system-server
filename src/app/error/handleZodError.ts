import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGeneticErrorResponse } from '../interface/error';

export const handleZodError = (err: ZodError): TGeneticErrorResponse => {
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: 'validation error',
    errorSources,
  };
};
