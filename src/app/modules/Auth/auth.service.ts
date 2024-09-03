import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../../config';
import { User } from '../User/user.model';

export class AuthService {
  async login(loginData: { email: string; password: string }) {
    // Find the user by email
    // const user = await User.findOne({ email });
    const user = await User.findOne({ email: loginData.email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(
      loginData.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    await user.save();
    // Generate JWT token
    const token = jwt.sign(
      {
        sub: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        address: user.address,
      },
      config.jwt_access_secret as string,
      { expiresIn: '1h' },
    );

    return { token, user };
  }
}
