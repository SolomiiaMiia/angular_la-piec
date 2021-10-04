import { ICategory } from "../interfaces/category.interface";
import { IProducts } from "../interfaces/products.interface";

export class Product implements IProducts {
  constructor(
    public name: string,
    public urlName: string,
    public category: ICategory,
    public description: string,
    public price: number,
    public weight: string,
    public image: string,
    public count: number = 1,
    public id?: number,
  ) { }
}