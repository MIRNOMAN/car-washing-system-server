import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

export const createToken = (
  jwtPayload: {
    name: string;
    email: string;
    role: 'user' | 'admin';
    phone: string;
    address: string;
    isDeleted: boolean;
    _id: Types.ObjectId;
  },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
