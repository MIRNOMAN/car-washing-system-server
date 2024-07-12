/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response } from 'express';
import httpStatus from 'http-status';

// eslint-disable-next-line no-unused-vars
export const notFound = (req: Request, res: Response, next: Function) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Api not found !!',
    error: '',
  });
};
