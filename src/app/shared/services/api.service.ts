import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/category.interface';
import { IProducts } from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlCategory: string;
  private urlProduct: string;

  constructor(private http: HttpClient) {
    this.urlCategory = 'http://localhost:3000/categories';
    this.urlProduct = 'http://localhost:3000/products'
  }

  //Category

  getJSONCategories(): Observable<Array<ICategory>> {
    return this.http.get<Array<ICategory>>(this.urlCategory);
  }

  postJSONCategory(category: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(this.urlCategory, category);
  }
  deleteJSONCategory(id: number): Observable<ICategory> {
    return this.http.delete<ICategory>(`${this.urlCategory}/${id}`);
  }

  updateJSONCategory(category: ICategory): Observable<ICategory> {
    return this.http.put<ICategory>(`${this.urlCategory}/${category.id}`, category)
  }

  //Products і на db.json створити "products" бо не запушить

  getJSONProducts(): Observable<Array<IProducts>> {
    return this.http.get<Array<IProducts>>(this.urlProduct);
  }

  postJSONProduct(product: IProducts): Observable<IProducts> {
    return this.http.post<IProducts>(this.urlProduct, product);
  }
  deleteJSONProduct(id: number): Observable<IProducts> {
    return this.http.delete<IProducts>(`${this.urlProduct}/${id}`);
  }

  updateJSONProduct(product: IProducts): Observable<IProducts> {
    return this.http.put<IProducts>(`${this.urlProduct}/${product.id}`, product)
  }


  //для конкретної котегорії (є фільтер)
  getJSONCategoryProducts(categoryName: string): Observable<Array<IProducts>> {
    return this.http.get<Array<IProducts>>(`${this.urlProduct}?category.urlName=${categoryName}`);
  }


}
