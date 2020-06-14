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

// user
var user01 = new models.User({
  name: "Lucas",
  username: "lucas02",
  password: "123456",
  email: "ribeiro.lucas.soares@gmail.com",
  admin: true,
  created_at: new Date(),
  location: {
    lat: -23.2473191,
    long: -45.9046522
  }
});

user01.save(function (err) {
  if (err) throw err;
  console.log(user01._id);
});

// // restaurant
// var restaurantSchema = new Schema({
//   name: { type: String, required: true },
//   description: String,
//   address: String,
//   city: String,
//   state: String,
//   created_at: Date,
//   location: {
//     lat: { type: Number },
//     long: { type: Number }
//   }
// });

// // evaluation
// var evaluationSchema = new Schema({
//   type: { type: String, enum: ["like", "dislike"] },
//   created_at: Date,
//   location: {
//     lat: { type: Number },
//     long: { type: Number }
//   },
//   dish: [{ type: Schema.ObjectId, ref: 'dish' }],
//   user: [{ type: Schema.ObjectId, ref: 'user' }]
// });

// // dish
// var dishSchema = new Schema({
//   photo: String,
//   description: String,
//   created_at: Date,
//   user: [{ type: Schema.ObjectId, ref: 'restaurant' }]
// });