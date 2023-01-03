/*
  Created by: Aditi Patidar
  Date: Nov 21, 2022
  This contains all the routes used by angular app
*/

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoanListComponent } from './loan-list/loan-list.component';
import { LogInComponent } from './log-in/log-in.component';
import { MyLoansComponent } from './my-loans/my-loans.component';
import { NewLoanComponent } from './new-loan/new-loan.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './services/shared/auth-guard.service';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'log-in', component: LogInComponent },
  { path: 'my-loans', component:  MyLoansComponent, canActivate: [AuthGuardService]}, // This is the protected resource
  { path: 'all-loans', component: LoanListComponent, canActivate: [AuthGuardService] }, // This is the protected resource
  { path: 'new-loan', component: NewLoanComponent, canActivate: [AuthGuardService] }, // This is the protected resource
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }, // redirect to home page when user does not specify any route
  { path: '**', redirectTo: '/page-not-found' } // redirect to page not foud if route does not match with the above defined routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
