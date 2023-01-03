/*
  Created by: Aditi Patidar
  Date: Nov 15, 2022
  This file define the express app
*/

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
// app.use(cors());

// ToDo: Allow production domain to pass CORS
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // Access the express app from angular local host
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// 3) ROUTES
const userRouter = require('./routes/userRoutes');
const loanRouter = require('./routes/loanRoutes');

app.use('/api/v1/users', userRouter);
app.use('/api/v1/loan', loanRouter);

module.exports = app;
