// --------------
// init

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("localhost", "like_food_db", 27017);
console.log("connected!");

// --------------
// load schemas

var models = require('./model/models.js')(mongoose);

// --------------
// populate schemas

console.log("populating schemas...");

var query = {username: /lucas/i};
models.User.find(query, function (err, data) {
  console.log(data);
});