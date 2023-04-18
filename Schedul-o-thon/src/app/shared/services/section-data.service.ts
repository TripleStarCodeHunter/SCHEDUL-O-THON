import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SectionDataService {
  private apiUrl = '/api/sections';

  constructor(private http: HttpClient) { }

  getData(sub_batch_id?: string |null): Observable<any[]> {
    const url = `${this.apiUrl}?sub_batch_id=${sub_batch_id}`;
    return this.http.get<any[]>(url);
  }
}
