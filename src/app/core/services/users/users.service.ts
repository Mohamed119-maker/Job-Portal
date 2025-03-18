import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }
  getAllUsers(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}api/User`);
  }

  addNewAccount(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}api/Job/add-user`, data);
  }

  deleteAccount(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}api/Job/delete-user/${id}`)
  }
}
