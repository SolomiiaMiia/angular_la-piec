import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlCategory: string;
  private urlProduct: string;

  constructor(private http: HttpClient) {
    this.urlCategory = 'http://localhost:3000/categories';
  }

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



}
