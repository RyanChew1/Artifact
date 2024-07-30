  export type INewUser = {
    name: string;
    email: string;
    username: string;
    password: string;
  };

export type IProduct = {
  id: number;
  title: string;
  seller:string;
  price: number;
  description: string;
  imageUrl: string;
}