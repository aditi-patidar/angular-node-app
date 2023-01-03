/*
  Created by: Aditi Patidar
  Date: Nov 17, 2022
  User entity related operations on the database and API request responses are handled here.
*/

const User = require('./../models/userModel');

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find().select({name: 1, _id: 1});;
  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.password // this needs to be changed
    });
  
    res.status(201).json({
      status: 'success',
      data: newUser
    });
  } catch(error) {
    console.log(error);
    return res.status(400).send({ status: 400, message: 'something happened!'});
  }
 
};
exports.deleteMe = async (req, res) => {
  await User.findByIdAndDelete(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null
  });
};

exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id).select({name: 1, _id: 1});
  res.status(200).json({
    status: 'success',
    data: user
  });
};

exports.updateUser = async (req, res) => {
  const newUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  res.status(201).json({
    status: 'User update successfully!',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
