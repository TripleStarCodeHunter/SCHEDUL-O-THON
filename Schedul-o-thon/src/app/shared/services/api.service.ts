import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private ROOT_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.ROOT_URL}/api/register`, userData);
  }
}
