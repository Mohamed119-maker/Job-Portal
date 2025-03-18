import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private httpClient: HttpClient) { }

  goToDetails(id: number): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}api/Application/jobs/${id}`)
  };


}
