export type TService = {
  _id?: string;
  name: string;
  description: string;
  photo: string;
  price: number;
  duration: number; // Duration in minutes
  isDeleted: boolean;
};

export type DeleteServiceInput = {
  params: {
    id: string;
  };
};
