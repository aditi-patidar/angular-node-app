/*
  Created by: Aditi Patidar
  Date: Nov 14, 2022
  Route entries for loan
*/
const express = require('express');
const loanController = require('./../controllers/loanController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, loanController.getAllLoans)
  .post(authController.protect, loanController.createLoan);

/*   router
  .route('myLoans/:id')
  .get(authController.protect, loanController.getLoanByUser) */

router
  .route('/:id')
  .get(authController.protect, loanController.getLoanByUser)
  .patch(authController.protect, loanController.updateLoan)
  .delete(authController.protect, loanController.deleteLoan);

module.exports = router;
