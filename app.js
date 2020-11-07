var express = require("express");
var path = require("path");
var logger = require("morgan");
var apiRouter = require("./routes/api.routes");
var cors = require("cors");

const port = process.env.PORT || 8000;

var app = express();
require("./socket");
require("./db");

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("uploads/images"));
app.use("/file", express.static(path.join(__dirname, "uploads/images")));

app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log("i am at error handling middleware...", err);
  res.status(err.status || 400);
  // console.log(err);
  res.json(err);
});

//server listening port
app.listen(port, function (err, done) {
  if (err) {
    console.log("connection failed", err);
  } else {
    console.log("listening at port ", port);
  }
});
