export type TLoginUser = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  token: string;
  data: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
  };
};
