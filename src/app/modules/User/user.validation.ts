import { z } from 'zod';

const userSchema = z.object({
  name: z.string().nonempty('Full name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  role: z.enum(['admin', 'user']),
  address: z.string().nonempty('Address is required'),
});

export const UserValidation = {
  userSchema,
};
