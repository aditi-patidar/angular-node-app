/* Created by: Aditi Patidar
   Date: Nov 21, 2022
  This is the root component of Application.
*/

import { Component } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Alert } from './data-types/data-types';
import { AuthService } from './services/auth.service';
import { AlertService } from './services/shared/alert.service';
import { UserService } from './services/shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'module7-angular-loans-app';
  faSearch = faSearch;
  showAlert = false;
  alert: Alert;
  loggedIn = false;
  userName: string | null;
  userId: string | null;
  private showAlertSubscription: Subscription;
  private alertSubscription: Subscription;
  private tokenSubscription: Subscription;
  constructor(private alertService: AlertService, private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    // Subscribe to the observable to catch the events to show or hide alerts
    this.showAlertSubscription = this.alertService.showAlert()
        .subscribe((resp) => {
          this.showAlert = resp;
    });

    // Subscribe to the observable to get the alert message and it's type
    this.alertSubscription = this.alertService.getAlert()
        .subscribe((resp: Alert) => {
          this.alert = resp;
    });

    // Subscribe to token observable to get the user name and show lgo in or log out action based on user's logged in status
    this.tokenSubscription = this.authService.isTokenSet()
        .subscribe((resp) => {
          this.loggedIn = resp.isTokenPresent;
          this.userName = resp.userName;
    });

    if (localStorage.getItem('token')) {
      this.loggedIn = true;
    }
    if (localStorage.getItem('userId')) {
      this.userId = localStorage.getItem('userId');
    }

    if (this.loggedIn) {
      this.userService.getUserDetail(this.userId).subscribe((data: any) => {
        this.userName = data?.data?.name;
      });
    }
  }

  logOut() {
    this.authService.logOut();
  }

  // unsubscribe from all the observable events to avoid memory leak.
  // and perform all the cleanup activity here on exit from app
  ngOnDestroy() {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiresOn');
    localStorage.removeItem('userId');
    this.showAlertSubscription.unsubscribe();
    this.alertSubscription.unsubscribe();
    this.tokenSubscription.unsubscribe();
  }

}
