/*
  Created by: Aditi Patidar
   Date: Nov 21, 2022
  This contains the methods which are invoked when user tries to access the protected resources on the front end.
  It provides extra layer of security.
*/
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private alertService: AlertService) {}

  // Check whether the token is present in the loaclstorage and it's not expired.
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
      Observable<boolean> | Promise<boolean> | boolean {
        const tokenExpiresOn = JSON.parse(localStorage.getItem('tokenExpiresOn') as any);
        if (localStorage.getItem("token") && tokenExpiresOn > Date.now()) {
          return true;
        } else {
          this.alertService.setAlert('Please log in to access the loans!', 'info')
          return false;
        }
  }
}

