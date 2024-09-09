import mongoose from 'mongoose';
import { TErrorSources, TGeneticErrorResponse } from '../interface/error';

export const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGeneticErrorResponse => {
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val.path,
        message: val.message,
      };
    },
  );

  const statusCode = 400;
  return {
    statusCode,
    message: 'validation error',
    errorSources,
  };

  // const statusCode = 400;
  // return {
  //   statusCode,
  //   message: 'validation error',
  //   errorSources,
  // };
};
