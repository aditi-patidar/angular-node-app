/*
  Created by: Aditi Patidar
   Date: Nov 23, 2022
  This contains all the logic to support new loan form.
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  @ViewChild('f') signUpForm: NgForm;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSignUp() {
    let request = {
      "name": this.signUpForm.value.name,
      "email": this.signUpForm.value.email,
      "password": this.signUpForm.value.password,
      "passwordConfirm": this.signUpForm.value.passwordConfirm,
    };
    this.authService.signUp(request);
  }
}
