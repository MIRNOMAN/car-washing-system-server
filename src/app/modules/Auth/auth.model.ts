import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface ILoginUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, required: true },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

// Hash the password before saving the user
UserSchema.pre<ILoginUser>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export const LoginUsers = mongoose.model<ILoginUser>('LoginUsers', UserSchema);
