import { ICategory } from "./category.interface";

export interface IProducts {
  name: string;
  urlName: string;
  category: ICategory;
  description: string;
  weight: string;
  price: number;
  image: string;
  count: number;
  id?: number;
}