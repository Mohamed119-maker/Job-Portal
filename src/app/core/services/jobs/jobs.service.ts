
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private httpClient: HttpClient) { }

  addNewJob(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}api/Job`, data)
  }

  getAllJobs(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}api/Job`)
  }

  getAllIds(): Observable<{ id: number }[]> {
    return this.getAllJobs().pipe(
      map(jobs => jobs.map((job: { id: number }) => ({ id: job.id })))
    );
  }

  deleteJob(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}api/Job/${id}`)
  }

  searchForJob(job: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}api/Job/search?jobTitle=${job}`)
  }

}
