/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Model } from 'mongoose'
import { USER_ROLE } from './user.constant'

export type TUser = {
  name: string
  email: string
  password: string
  phone: string
  role: 'admin' | 'user'
  address: string
}

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByEmail(email: string): Promise<TUser>
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>
}

export type TUserRole = keyof typeof USER_ROLE

interface IService {
  _id: string
  name: string
  description: string
  price: number
  duration: number
}

interface ISlot {
  _id: string
  service: string
  date: string // ISO 8601 date string
  startTime: string // Time in "HH:MM" format
  endTime: string // Time in "HH:MM" format
  isBooked: string // Status of the booking
}

export interface IBooking {
  _id: string
  customer: string // User ID
  service: IService
  slot: ISlot
  vehicleType: string
  vehicleBrand: string
  vehicleModel: string
  manufacturingYear: number
  registrationPlate: string
  createdAt: string // ISO 8601 date string
  updatedAt: string // ISO 8601 date string
  __v: number
}

// Define the response type
export interface TGetBookingsResponse {
  success: boolean
  statusCode: number
  message: string
  data: IBooking[]
}