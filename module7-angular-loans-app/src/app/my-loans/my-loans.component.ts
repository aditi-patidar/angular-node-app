/* Created by: Aditi Patidar
  Date: Nov 23, 2022
  Component to subscribe to loan data and render my-loan.html */
import { Component, OnInit } from '@angular/core';
import { calculateTotalLoanAmount } from '../common-functions/common-functions';
import { LoanService } from '../services/loan.service';

@Component({
  selector: 'app-my-loans',
  templateUrl: './my-loans.component.html',
  styleUrls: ['./my-loans.component.scss']
})
export class MyLoansComponent implements OnInit {
  loans: Array<any>;

  constructor(private loanService: LoanService) { }

  ngOnInit(): void {
    this.loanService.getMyLoans(localStorage.getItem('userId')).subscribe((data: any) => {
      console.log(data);
      this.loans = data?.data.myLoans;
      this.loans.forEach(loan => {
        loan.totalPayment = calculateTotalLoanAmount(loan);
      });
    })
  }

}
