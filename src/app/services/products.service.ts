import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { environment } from '../environment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiBaseUrl = `${environment.apiBaseUrl}/products`;

  constructor(private http: HttpClient) { }


  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiBaseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }


  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiBaseUrl)
      .pipe(catchError(this.handleError));
  }


  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiBaseUrl, product)
      .pipe(catchError(this.handleError));

  }


  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiBaseUrl}/${id}`, product)
      .pipe(catchError(this.handleError));
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }


  private handleError(error: any) {
    console.error('Ocurrió un error:', error);
    return throwError(() => new Error('Algo salió mal. Por favor, intenta de nuevo más tarde.'));
  }
}
