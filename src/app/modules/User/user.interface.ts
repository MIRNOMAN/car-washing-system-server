export type TUserRole = 'user' | 'admin';

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: TUserRole;
  isDeleted: boolean;
};

export type TAuth = {
  email: string;
  password: string;
};

// export type TAuth = {
//   email: string;
//   password: string;
// };

// export type TUser = {
//   name: string;
//   email: string;
//   password: string;
//   phone: string;
//   address: string;
//   role: TUserRole;
//   isDeleted: boolean;
// };
