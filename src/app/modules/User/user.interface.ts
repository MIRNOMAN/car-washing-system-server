/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export type TUserRole = "admin" | "user";
export type TUser = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  address: string;
};

export type TUserLogin = {
  email: string;
  password: string;
};

export interface TUserModel extends Model<TUser> {
  isUserExistByCustomEmail(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}