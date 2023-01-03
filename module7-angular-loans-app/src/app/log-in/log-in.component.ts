/*
  Created by: Aditi Patidar
  This component holds the logic of log in form.
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Alert } from '../data-types/data-types';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/shared/alert.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  @ViewChild('f') signInForm: NgForm;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {}

  onSignIn() {
    let authRequest = {
      "email": this.signInForm.value.email,
      "password": this.signInForm.value.password
    };
    this.authService.logIn(authRequest);
  }

}
