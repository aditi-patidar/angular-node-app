/*
Created By: Aditi Patidar
 Date: Nov 21, 2022
We won't call any user API from here except getting basic user information like name and email.
*/

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient, private router: Router) { }
  tokenStr = 'Bearer ' + localStorage.getItem('token');

  // This API call only returns username and email
  public getUserDetail(userId: string | null) {
    const headers = new HttpHeaders().set('Authorization', this.tokenStr);
    const url = `http://localhost:3000/api/v1/users/${localStorage.getItem('userId')}`
    return this.httpClient.get<string>(url , {headers});
  }
}
