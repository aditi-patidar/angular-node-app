/* Created by: Aditi Patidar
Date: Nov 22, 2022
This file contains all the common functions used throughout the app.
*/

export const calculateTotalLoanAmount = (loan: any) => {
  let n = loan.loanTermYears * 12;
  let i = loan.interestRate.$numberDecimal / (100 * 12);
  let monthlyPayment = (loan.loanAmount.$numberDecimal * i * Math.pow((1 + i), n)) / (Math.pow((1 + i), n) - 1);
  let totalLoanAmount = monthlyPayment * 12 * loan.loanTermYears;
  return Math.round(totalLoanAmount * 100) / 100;
};
