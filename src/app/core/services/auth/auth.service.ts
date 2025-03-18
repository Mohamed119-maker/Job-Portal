import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router, @Inject(PLATFORM_ID) private id: object) { }
  userData: any;


  registerForm(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}api/User/register`, data)
  }

  loginForm(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}api/User/login`, data)
  }

  logoutUser(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    this.router.navigate(["/login"]);
  }

  getUserData(): void {
    if (isPlatformBrowser(this.id)) {
      this.userData = jwtDecode(localStorage.getItem('token')!);

      console.log(this.userData);
    }


  }
}
