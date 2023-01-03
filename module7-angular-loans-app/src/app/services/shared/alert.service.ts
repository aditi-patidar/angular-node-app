/*
Created by: Aditi Patidar
 Date: Nov 21, 2022
This service contains the methods to manage the subscription of alert throughout the application.
*/

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    private alertSubject = new Subject<any>();
    private showAlertSubject = new Subject<any>();

    constructor() { }

    getAlert(): Observable<any> {
      return this.alertSubject.asObservable();
    }

    // Subscribe to this method in the component to get the most up-to-date state of the alert.
    showAlert(): Observable<any> {
      return this.showAlertSubject.asObservable();
    }

    // Call this method from service/interceptor/controller to hide or show the alert
    setAlertFlag(flag: boolean) {
      this.showAlertSubject.next(flag);
    }

    // Call this method to set the alert message and type of alert
    setAlert(message: string, type: string = 'success') {
      this.alertSubject.next({ type: type, message: message });
      this.showAlertSubject.next(true);
    }
}
