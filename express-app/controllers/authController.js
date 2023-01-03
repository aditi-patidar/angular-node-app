/*
  Created by: Aditi Patidar
  Date: Nov 18, 2022
  authentication related operations and API request responses are handled here.
*/
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const AppError = require('./../utilities/appError');
const bcrypt = require('bcryptjs');
const util = require('util')

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  // token will expire in 25 days
  const tokenExpiresOn = Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 10 * 1000;
  const cookieOptions = {
    expires: new Date(
      tokenExpiresOn
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    tokenExpiresOn,
    data: {
      user
    }
  });
};

exports.signup = async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  createSendToken(newUser, 201, res);
};

const comparePassword = async (plaintextPassword, hash) => {
  const result = await bcrypt.compare(plaintextPassword, hash);
  return result;
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  // 1) Check if email and password exist
  if (!email || !password) {
    new AppError('Please provide email and password!', 400);
    return res.status(400).send({ status: 400, message: 'Please provide email and password!'});
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await comparePassword(password, user.password))) {
    new AppError('Incorrect email or password', 401);   
    return res.status(401).send({ status: 401, message: 'Incorrect email or password'});
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
};

exports.logout = (req, res) => {
  /* res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now()),
    httpOnly: true
  });
   */
  res.status(200).json({ status: 'success' });
};

exports.protect = async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  let decoded;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    new AppError('You are not logged in! Please log in to get access.', 401);
    return res.status(401).send({ status: 401, message: 'You are not logged in! Please log in to get access.'});
  }

  // 2) Verification token
  try {
    decoded = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch(err) {
    return res.status(401).send({ status: 401, message: 'Your token is expired, please log in again.', errorCode: 'TOKEN_EXPIRED'});
  }


  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    new AppError(
      'The user belonging to this token does no longer exist.',
      401
    );
    return res.status(401).send({ status: 401, message: 'The user belonging to this token does no longer exist.'});
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    new AppError('User recently changed password! Please log in again.', 401);
    return res.status(401).send({ status: 401, message: 'User recently changed password! Please log in again.'});
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
};

// Only for rendered pages, no errors!
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

