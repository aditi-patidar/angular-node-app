/*
  Created by: Aditi Patidar
  Date: Nov 21, 2022
  This is the first module which bootstraps when application starts
*/

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { LoanListComponent } from './loan-list/loan-list.component';
import { NewLoanComponent } from './new-loan/new-loan.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AlertComponent } from './alert/alert.component';
import { CatchErrorInterceptor } from './interceptor/catch-error.interceptor';
import { MyLoansComponent } from './my-loans/my-loans.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignUpComponent,
    LogInComponent,
    LoanListComponent,
    NewLoanComponent,
    PageNotFoundComponent,
    AlertComponent,
    MyLoansComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: CatchErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
