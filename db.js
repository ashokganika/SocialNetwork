var mongoose = require("mongoose");
var config = require("./configs/db.configs");

mongoose.connect(config.conxUrl + "/" + config.dbName, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.once("open", function () {
  console.log("database connection successful... ");
});

mongoose.connection.on("err", function () {
  console.log("database connection failed...");
});
