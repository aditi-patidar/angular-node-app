/*
  Created by: Aditi Patidar
  Date: Nov 17, 2022
  loan entity related operations on the database and API request responses are handled here.
*/
const LoanModel = require('./../models/loanModel');
const APIFeatures = require('./../dataBaseManager/loanDbContext');

exports.getAllLoans =   async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(LoanModel.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const loans = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: loans.length,
      data: {
        loans
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

// Fetch all the loans using mongoose built-in method find()
exports.getAllLoans = async (req, res) => {
  try {
    const allLoans = await LoanModel.find();
    //return res.status(200).json(allLoans);
    res.status(200).json({
      status: 'success',
      data: {
        allLoans
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

// Fetch a single loan by id using mongoose built-in method findById()
exports.getLoan = async (req, res) => {
  try {
    const loan = await LoanModel.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        loan
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};


exports.getLoanByUser = async (req, res) => {
  try {
    const myLoans = await LoanModel.find({_customerID: req.params.id});
    res.status(200).json({
      status: 'success',
      data: {
        myLoans
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

// Create a loan using mongoose built-in method create()
exports.createLoan = async  (req, res) => {
  try {
    const newLoan = await LoanModel.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        loan: newLoan
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

// Update a loan using mongoose built-in method findByIdAndUpdate()
exports.updateLoan = async (req, res) => {
  try {
    const loan = await LoanModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        loan
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

// Delete a loan using mongoose built-in method findByIdAndDelete()
exports.deleteLoan = async (req, res) => {
  try {
    await LoanModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'document deleted successfully!',
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
