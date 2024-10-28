import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import config from "../config";
import { TUserRole } from "../modules/User/user.interface";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../error/appError";
import { UserModel } from "../modules/User/user.model";


const auth = (...RequiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // check if the token exist or not
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }
    // check if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    //   check if user exist or not
    const { role, email } = decoded;
    const user = await UserModel.isUserExistByCustomEmail(email);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
    }

    if (RequiredRoles && !RequiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route"
      );
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;