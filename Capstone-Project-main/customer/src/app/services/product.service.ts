import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';


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

 
}
