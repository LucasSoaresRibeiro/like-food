// --------------
// init

console.log("initializing...");

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// mongoose.connect("localhost", "like_food_db", 27017);
mongoose.connect('mongodb://dbuser:ita123456@ds045694.mongolab.com:45694/heroku_wx5mvrc1');

var express = require('express');
var app = express();

//criamos instancia do body-parser, usado nos handlers
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// --------------
// load schemas

var models = require('./models/models.js')(mongoose);

// --------------
// routes

app.use("/", express.static(__dirname + '/site'));

app.get('/api/user/login/:email/:password', jsonParser, function(req, res){

	if(!(req.params.email != "" && req.params.email != null && req.params.password != "" && req.params.password != null)) {
		res.statusCode = 400;
		return res.jsonp({status: 'Error 400: use of login with bad data.'});
	}

	var query = {email: req.params.email, password: req.params.password};
	models.User.findOne(query, function (err, data) {
		if (err){
			res.statusCode = 400;
			return res.jsonp(err);
		}
		else if(data == null) {
			res.statusCode = 400;
			return res.jsonp({status: 'Error 400: use of login with bad data.'});
		}
		else{
			return res.jsonp(data._id);
		}
	});
});

app.get('/api/user/join/:name/:email/:password', jsonParser, function(req, res){

	if(!(req.params.name != "" && req.params.name != null
		&& req.params.email != "" && req.params.email != null
		&& req.params.password != "" && req.params.password != null)) {
		res.statusCode = 400;
		return res.jsonp({status: 'Error 400: use of join with bad data.'});
	}

	// Search for duplicate user
	var userJson = 	{
	  "name": req.params.name,
	  "username": req.params.name,
	  "password": req.params.password,
	  "email": req.params.email,
	  "admin": false,
	  "location": {
	    "lat": 0,
	    "long": 0
	  }
	}

	var user = new models.User(userJson);
	user.created_at = new Date();
	user.save(function (err) {
		if (err){
			res.statusCode = 400;
			return res.jsonp(err);
		}
	  	var message = 'Item salvo com o id ' + user._id;
	  	return res.jsonp(message);
	});
});

app.post('/api/add/:type', jsonParser, function(req, res){

	if(req.params.type == "user") {
		var user = new models.User(req.body);
		user.created_at = new Date();
		user.save(function (err) {
			if (err){
				res.statusCode = 400;
				return res.jsonp(err);
			}
		  	var message = 'Item salvo com o id ' + user._id;
		  	return res.jsonp(message);
		});
	}
	else if(req.params.type == "restaurant") {
		var restaurant = new models.Restaurant(req.body);
		restaurant.created_at = new Date();
		restaurant.save(function (err) {
			if (err){
				res.statusCode = 400;
				return res.jsonp(err);
			}
		  	var message = 'Item salvo com o id ' + restaurant._id;
		  	return res.jsonp(message);
		});
	}
	else if(req.params.type == "evaluation") {
		var evaluation = new models.Evaluation(req.body);
		evaluation.created_at = new Date();
		evaluation.save(function (err) {
			if (err){
				res.statusCode = 400;
				return res.jsonp(err);
			}
		  	var message = 'Item salvo com o id ' + evaluation._id;
		  	return res.jsonp(message);
		});
	}
	else if(req.params.type == "dish") {
		var dish = new models.Dish(req.body);
		dish.created_at = new Date();
		dish.save(function (err) {
			if (err){
				res.statusCode = 400;
				return res.jsonp(err);
			}
		  	return res.jsonp('Item salvo com o id ' + dish._id);
		});
	}
	else{
		res.statusCode = 400;
		return res.jsonp('Parametros invalidos');
	}

});

app.get('/api/search/:type', jsonParser, function(req, res){

	var choosedType;
	var populateA = "";
	var populateB = "";

	if(req.params.type == "user") {
		choosedType = models.User;
	}
	else if(req.params.type == "restaurant") {
		choosedType = models.Restaurant;
	}
	else if(req.params.type == "evaluation") {
		choosedType = models.Evaluation;
		populateA = "user";
		populateB = "dish";
	}
	else if(req.params.type == "dish") {
		choosedType = models.Dish;
		populateA = "restaurant";
	}
	else{
		res.statusCode = 400;
		return res.jsonp('Parametros invalidos');
	}

	choosedType.find(function (err, data) {
		if (err){
			res.statusCode = 400;
			return res.jsonp(err);
		}
		return res.jsonp(data);
	}).populate(populateA).populate(populateB);

});

app.get('/api/search/:type/random', jsonParser, function(req, res){

	var choosedType;

	if(req.params.type == "user") {
		choosedType = models.User;
	}
	else if(req.params.type == "restaurant") {
		choosedType = models.Restaurant;
	}
	else if(req.params.type == "evaluation") {
		choosedType = models.Evaluation;
	}
	else if(req.params.type == "dish") {
		choosedType = models.Dish;
	}
	else{
		res.statusCode = 400;
		return res.jsonp('Parametros invalidos');
	}

	choosedType.find(function (err, data) {
		if (err){
			res.statusCode = 400;
			return res.jsonp(err);
		}
		return res.jsonp(data);
	}).limit( 1 ).skip( Math.random() );

});

app.get('/api/delete/:type/:id', jsonParser, function(req, res){

	var choosedType;

	if(req.params.type == "user") {
		choosedType = models.User;
	}
	else if(req.params.type == "restaurant") {
		choosedType = models.Restaurant;
	}
	else if(req.params.type == "evaluation") {
		choosedType = models.Evaluation;
	}
	else if(req.params.type == "dish") {
		choosedType = models.Dish;
	}
	else{
		res.statusCode = 400;
		return res.jsonp('Parametros invalidos');
	}

	choosedType.find({ _id:req.params.id }).remove( function (err, data) {
		if (err){
			res.statusCode = 400;
			return res.jsonp(err);
		}
		return res.jsonp(data);
	});

});

app.get('/api/evaluate/:type/:lat/:long/:dish/:user', jsonParser, function(req, res){

	var dish = new models.Dish();
	dish._id = req.params.dish;

	var user = new models.User();
	user._id = req.params.user;

	var evaluation = new models.Evaluation();
	evaluation.type = req.params.type;
	evaluation.created_at = new Date();
	evaluation.location.lat = req.params.lat;
	evaluation.location.long = req.params.long;
	evaluation.dish = dish;
	evaluation.user = user;

	evaluation.save(function (err) {
		if (err){
			res.statusCode = 400;
			return res.jsonp(err);
		}
	  	return res.jsonp('Item salvo com o id ' + evaluation._id);
	});

});

// --------------
// listener

app.listen(process.env.PORT || 9999, '0.0.0.0');
console.log("Running API");
console.log("Access http://localhost:9999/api");