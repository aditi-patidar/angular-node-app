/*
  Created by: Aditi Patidar
  Date: Nov 22, 2022
  This is the shared component which displays alerts throughout the app.
  All the changes related to alert must be managed here.
*/
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Alert } from '../data-types/data-types';
import { AlertService } from '../services/shared/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() alert: Alert;
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    // Automatic close the alert after 5 seconds.
    setTimeout(() => {
      this.selfClosingAlert.close();
      this.alertService.setAlertFlag(false);
    }, 5000);
  }

  close() {
    this.alertService.setAlertFlag(false);
  }

}
