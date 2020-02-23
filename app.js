var express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var apiRouter = require('./routes/api.routes');

const port = process.env.PORT || 8001;

var app = express();
var db = require('./db');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', apiRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
});

// error handler
app.use(function(err, req, res, next) {
  console.log("i am at error handling middleware...", err);
  res.json(err);
});


//server listening port
app.listen(port, function(err, done){
  if(err){
    console.log("connection failed", err);
  }
  else{
    console.log("listening at port ", port);
  }
})