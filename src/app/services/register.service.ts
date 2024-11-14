import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Register } from '../models/register.model';
import { environment } from '../environment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = `${environment.apiBaseUrl}/users`;
  constructor(private http: HttpClient) {}
  registerUser(registerData: Register): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, registerData);
  }
}
