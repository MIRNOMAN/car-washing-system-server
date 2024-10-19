import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { UserModel } from "../modules/User/user.model";

function CheckUniqueEmail() {
    return async (req: Request, res: Response, next: NextFunction) => {
        const isEmailExist = await UserModel.findOne({ email: req.body.email });

        if (isEmailExist) {
            return res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: 'Email already registered'
            });

        } else {
            return next();
        };
    }
};

export default CheckUniqueEmail;