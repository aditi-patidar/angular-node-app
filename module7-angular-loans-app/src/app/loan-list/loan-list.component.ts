/* Created by: Aditi Patidar
  Date: Nov 24, 2022
  Compinent to subscribe to loan data and render loan.html */

import { Component, OnInit } from '@angular/core';
import { calculateTotalLoanAmount } from '../common-functions/common-functions';
import { LoanService } from '../services/loan.service';


@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent implements OnInit {
  loans: Array<any>;
  constructor(private loanService: LoanService) { }

  ngOnInit(): void {
    // this.loans = this.loanService.getLoans();
    this.loanService.getLoans().subscribe((data: any) => {
      this.loans = data?.data.allLoans;
      this.loans.forEach(loan => {
        loan.totalPayment = calculateTotalLoanAmount(loan);
      });
    })
  }
}
