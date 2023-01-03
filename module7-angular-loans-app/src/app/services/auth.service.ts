/*
  Created By: Aditi Patidar
   Date: Nov 23, 2022
  This service is used to store all the authentication related API call and token management.
*/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AlertService } from './shared/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject = new Subject<any>();

  constructor(private httpClient: HttpClient, private router: Router, private alertService: AlertService) { }

  public signUp(request: any) {
    return this.httpClient.post<string>("http://localhost:3000/api/v1/users/signup", request).subscribe(response => {
      this.alertService.setAlert('You have signed up successfully! Please log in to continue');
      this.router.navigate(['/log-in'])
    });
  }

  /* public isTokenValid() {
    const tokenExpiresOn = localStorage.getItem('tokenExpiresOn');
  } */

  isTokenSet(): Observable<any> {
    return this.tokenSubject.asObservable();
  }

  public logIn(request: any) {
    return this.httpClient.post<string>("http://localhost:3000/api/v1/users/login", request).subscribe((response: any) => {
      this.alertService.setAlert('You have logged in successfully!')
      this.setToken(response);
      this.router.navigate(['/home']);
    });
  }

  private setToken(authResponse: any) {
    this.tokenSubject.next({'isTokenPresent': true, 'userName': authResponse.data.user.name});
    localStorage.setItem('token', authResponse.token);
    localStorage.setItem('tokenExpiresOn', authResponse.tokenExpiresOn);
    localStorage.setItem('userId', authResponse.data.user._id);
  }

  // Clear all the local storage parameter on log out.
  public logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiresOn');
    localStorage.removeItem('userId');
    this.tokenSubject.next(false);
    return this.httpClient.post<string>("http://localhost:3000/api/v1/users/logout", {}).subscribe(response => {
      this.router.navigate(['/home'])
    });
  }
}
