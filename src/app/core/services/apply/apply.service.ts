import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplyService {

  myToken: any = localStorage.getItem('token');

  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private id: object) { }


  applyJob(id: number): Observable<any> {
    return this.httpClient.post(
      `  ${environment.baseUrl}api/Application/apply`,
      {
        "jobId": id
      },
      {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.myToken}` // تأكد من أن هذا التوكن يحتوي على القيمة الصحيحة
        })
      }
    );
  }
}
