import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/login.model';
import { environment } from '../environment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `${environment.apiBaseUrl}/users`;

  constructor(private http: HttpClient) {}

  loginUser(loginData: Login): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData);
  }
}
