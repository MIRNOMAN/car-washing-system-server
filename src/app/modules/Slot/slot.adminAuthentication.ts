/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config';

export const authenticateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: No token provided' });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }

    // Decode the token to get the user data
    const decodedToken = jwt.decode(token);
    if (!decodedToken) {
      return res
        .status(403)
        .json({ message: 'Forbidden: Unable to decode token' });
    }

    // Verify the token to ensure its validity
    jwt.verify(
      token,
      config.jwt_access_secret as string,
      (err: any, user: any) => {
        if (err) {
          return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }

        // Check if the user is an admin
        if (!user || !user.isAdmin) {
          return res
            .status(403)
            .json({ message: 'Admin access only: Forbidden' });
        }

        // Attach the decoded user info to the request object for later use
        req.user = user;
        next(); // Proceed to the next middleware or controller
      },
    );
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
