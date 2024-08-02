export type INewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export type IProduct = {
  id: number;
  title: string;
  seller: string;
  price: number;
  description: string;
  imageUrl?: File;
  isSold: boolean;
  sellerId: string;
};

export type IProductCard = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  isSold: boolean;
  sellerId:string;
};
