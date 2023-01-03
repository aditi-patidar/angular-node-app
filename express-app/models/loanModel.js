/*
  Created by: Aditi Patidar
  Date: Nov 15, 2022
  Schema to define loan entity
*/
const mongoose = require('mongoose');

const loanModel = new mongoose.Schema({
    _customerID: {
        type: mongoose.ObjectId,
        required: [true, 'customerID is required']
    },
    customerName: {
        type: String,
        required: [true, 'customerName is required']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required']
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    description: {
        type: String,
        required: false
    },
    loanType: {
        type: String,
        enum : ['Home loan','Car loan', 'Personal loan', 'Student loan'],
        default: 'Personal loan'
    },
    loanAmount: {
        type: mongoose.Decimal128
    },
    interestRate: {
        type: mongoose.Decimal128
    },
    loanTermYears: {
        type: Number,
        default: 1,
        min: [1, 'loan term years must be above or equal to 1'],
        max: [30, 'loan term years must be below or equal to 30']
    },
    startDate: {
        type: Date, 
        required: [true, 'startDate is required'],
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdDate: {type: Date, default: Date.now},
    modifiedDate: {type: Date, default: Date.now}
});
const LoanModel = mongoose.model('Loan', loanModel);
module.exports = LoanModel;