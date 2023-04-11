import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GetUpcomingEventService {

  private apiUrl = '/api/upcoming-events';

  constructor(private http: HttpClient) { }
  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


}

