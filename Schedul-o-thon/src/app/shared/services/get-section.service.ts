import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetSectionService {
  private apiUrl = '/api/sub_batch';

  constructor(private http: HttpClient) { }
  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
