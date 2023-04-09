import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = '/api/event';

  constructor(private http: HttpClient) {}

  getData(id?: string | null): Observable<any[]> {
    const url = `${this.apiUrl}?id=${id}`;
    return this.http.get<any[]>(url);
  }
}
