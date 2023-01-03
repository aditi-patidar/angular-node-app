/*
  Created By: Aditi Patidar
   Date: Nov 23, 2022
  This service has all the API calls for loan APIs.
*/

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from './shared/alert.service';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  constructor(private httpClient: HttpClient, private router: Router, private alertService: AlertService) { }

  public getLoans() {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.get<string>("http://localhost:3000/api/v1/loan", {headers});
  }

  public getMyLoans(userId: string | null) {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    const url = 'http://localhost:3000/api/v1/loan/' + userId;
    return this.httpClient.get<string>(url, {headers});
  }

  public createNewLoan(request: any) {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    const url = 'http://localhost:3000/api/v1/loan';
    return this.httpClient.post<string>(url, request, {headers}).subscribe((response: any) => {
      this.alertService.setAlert('Loan is created successfully!')
      this.router.navigate(['/my-loans']);
    });;
  }
}
