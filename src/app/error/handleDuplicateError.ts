/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGeneticErrorResponse } from '../interface/error';

export const handleDuplicateError = (err: any): TGeneticErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);

  const extractedMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exsist`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'validation error',
    errorSources,
  };
};
