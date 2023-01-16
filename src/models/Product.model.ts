export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  weight: number;
  load: number;
  range: number;
  charge: number;
  battery: number;
  image: string;
  category: string;
}

export interface ICreate {
  name: string;
  description: string;
  price: number;
  weight: number;
  load: number;
  range: number;
  charge: number;
  battery: number;
  image: string;
  category: string;
}

export interface IProductData {
  data: ICreate[];
}
