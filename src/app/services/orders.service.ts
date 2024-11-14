import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/enviroment';
import { Orders } from '../models/orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {private apiBaseUrl = `${environment.apiBaseUrl}/orders`;

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Orders[]> {
    return this.http.get<Orders[]>(`${this.apiBaseUrl}`);
  }

  getOrderById(id: number): Observable<Orders> {
    return this.http.get<Orders>(`${this.apiBaseUrl}/${id}`);
  }

  createOrder(order: Orders): Observable<Orders> {
    return this.http.post<Orders>(`${this.apiBaseUrl}`, order);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/${id}`);
  }

  getOrdersByDate(date: Date): Observable<Orders[]> {
    const params = new HttpParams().set('date', date.toISOString());
    return this.http.get<Orders[]>(`${this.apiBaseUrl}/date`, { params });
  }

  getOrdersByDateRange(startDate: Date, endDate: Date): Observable<Orders[]> {
    const params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());
    return this.http.get<Orders[]>(`${this.apiBaseUrl}/date-range`, { params });
  }

  getOrdersByProduct(productId: number): Observable<Orders[]> {
    return this.http.get<Orders[]>(`${this.apiBaseUrl}/product/${productId}`);
  }

  getOrdersWithQuantityGreaterThan(minQuantity: number): Observable<Orders[]> {
    const params = new HttpParams().set('minQuantity', minQuantity.toString());
    return this.http.get<Orders[]>(`${this.apiBaseUrl}/quantity`, { params });
  }

  getTotalSalesInDateRange(startDate: Date, endDate: Date): Observable<number> {
    const params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());
    return this.http.get<number>(`${this.apiBaseUrl}/total-sales`, { params });
  }
}
