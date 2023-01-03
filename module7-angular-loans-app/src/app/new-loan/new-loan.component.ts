/*
  Created by: Aditi Patidar
   Date: Nov 25, 2022
  This contains all the logic to support new loan form.
*/
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoanService } from '../services/loan.service';
import { UserService } from '../services/shared/user.service';

@Component({
  selector: 'app-new-loan',
  templateUrl: './new-loan.component.html',
  styleUrls: ['./new-loan.component.scss']
})
export class NewLoanComponent implements OnInit {
  userId = localStorage.getItem('userId');
  userName: string | null;
  @ViewChild('f') newLoanForm: NgForm;

  constructor(private loanService: LoanService, private userService: UserService) { }

  ngOnInit(): void {
    // subscribe to getuserDetail API call to always pick the most updated user name.
    this.userService.getUserDetail(this.userId).subscribe((data: any) => {
      this.userName = data?.data?.name;
    });
  }

  onCreateNewLoan() {
    let request = {
      "_customerID": this.userId,
      "customerName": this.userName,
      "startDate": this.newLoanForm.value.startDate,
      "phoneNumber": this.newLoanForm.value.phoneNumber,
      "address": this.newLoanForm.value.address,
      "description": this.newLoanForm.value.description,
      "loanType": this.newLoanForm.value.loanType,
      "loanAmount": this.newLoanForm.value.loanAmount,
      "interestRate": this.newLoanForm.value.interestRate,
      "loanTermYears": this.newLoanForm.value.loanTermYears,
    };
    this.loanService.createNewLoan(request);
  }

}
