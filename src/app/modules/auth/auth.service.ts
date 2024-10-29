import httpStatus from 'http-status'
import config from '../../config'
import { TLoginUser } from './auth.interface'
import { createToken } from './auth.utils'
import { User } from '../User/user.model'
import { AppError } from '../../error/appError'


const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  // console.log(payload)
  const user = await User.isUserExistsByEmail(payload.email)
  // console.log(user)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched')

  //create token and sent to the  client

  const jwtPayload = {
    email: user.email,
    role: user.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  return {
    accessToken: accessToken,
    user,
  }
}

export const AuthServices = {
  loginUser,
}