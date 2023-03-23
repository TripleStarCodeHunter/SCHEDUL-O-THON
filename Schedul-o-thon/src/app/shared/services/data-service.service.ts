import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = '/api/batch';
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

   // DELETE a subbatch
   deletebatch(batchId: number): Observable<string> {
    console.log("THIs is "+batchId)
    const url = `${this.baseUrl}/${batchId}`;
    return this.http.delete<string>(url);
  }
}
