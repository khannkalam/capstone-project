import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Product} from '../models/product';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  

  // URL to web api
  private ProductUrl = 'http://localhost:5000/api/product';


  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.ProductUrl + "/getProduct");
  }

  getProductById(id: any): Observable<Product> {
    return this.http.get<Product>(`${this.ProductUrl}/getProductByID/${id}`);
  }

  addProduct(Product: Product): Observable<any> {
    return this.http.post<any>(this.ProductUrl + "/addProduct", Product, httpOptions);
  }

  updateProductById(Product: Product, id: any): Observable<Product> {
    return this.http.put<Product>(`${this.ProductUrl}/updateProduct/${id}`, Product, httpOptions);
  }

  deleteProductById(id: any): Observable<Product> {
    return this.http.delete<Product>(`${this.ProductUrl}/deleteProduct/${id}`);
  }
}
