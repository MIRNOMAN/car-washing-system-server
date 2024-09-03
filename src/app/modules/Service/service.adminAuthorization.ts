/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwt_access_secret as string);

    if (typeof decoded !== 'string') {
      // Type assertion to inform TypeScript that req.user is of type JwtPayload
      (req as any).user = decoded as JwtPayload;
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = (req as any).user as JwtPayload;

  if (!user || user.role !== 'admin') {
    return res.status(403).json({ message: 'Access forbidden: Admins only' });
  }

  next();
};
