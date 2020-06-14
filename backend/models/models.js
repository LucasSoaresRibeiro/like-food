// --------------
// requires

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// --------------
// set schemas properties

console.log("model - init schemas...");

// user
var userSchema = new Schema({
  name: String,
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  admin: Boolean,
  created_at: Date,
  location: {
    lat: { type: Number },
    long: { type: Number }
  }
});

// restaurant
var restaurantSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  address: String,
  city: String,
  state: String,
  created_at: Date,
  location: {
    lat: { type: Number },
    long: { type: Number }
  }
});

// evaluation
var evaluationSchema = new Schema({
  type: { type: String, enum: ["like", "dislike"] },
  created_at: Date,
  location: {
    lat: { type: Number },
    long: { type: Number }
  },
  dish: [{ type: Schema.ObjectId, ref: 'Dish' }],
  user: [{ type: Schema.ObjectId, ref: 'User' }]
});

// dish
var dishSchema = new Schema({
  photo: String,
  name: String,
  description: String,
  created_at: Date,
  restaurant: [{ type: Schema.ObjectId, ref: 'Restaurant' }]
});

// --------------
// create schemas

console.log("model - creating schemas...");

module.exports = function(mongoose) {
    var models = {
      User: mongoose.model('User', userSchema),
      Restaurant: mongoose.model('Restaurant', restaurantSchema),
      Evaluation: mongoose.model('Evaluation', evaluationSchema),
      Dish: mongoose.model('Dish', dishSchema)
    };
    return models;
}

console.log("model - done!");