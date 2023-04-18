import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetRegisterInfoService {

  private apiUrl = '/api/register_info';

  constructor(private http: HttpClient) { }
  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  
}