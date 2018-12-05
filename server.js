var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var Mongo = require('mongodb');
require('dotenv').config()
var port = process.env.PORT || 3000;

var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || '27017';
var mongoUsername = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASS;
var mongoDBName = process.env.MONGO_DB_NAME;

var mongoURL = "mongodb://" +
	mongoUsername + ":" + mongoPassword + "@" + mongoHost + ":" + mongoPort +
	"/" + mongoDBName;

var mongoDB = null;

var rawData = fs.readFileSync('./postData.json');
var cardData = JSON.parse(rawData); //get the post data

var hbs = exphbs.create({
	defaultLayout: 'main',
	// Specify helpers which are only registered on this instance.
	helpers: {
		percentage: function(answers, index) {
			var total = 0;
			answers.forEach(function(answer) {
				total += answer.count;
			});
			if (total == 0) {
				return 0;
			}
			total = (answers[index].count / total) * 100;
			return Math.round(total);
		},
		marginPercentage: function(answers, index) {
			if (index == 0){
				return 0;
			}
			index--;
			var total = 0;
			answers.forEach(function(answer) {
				total += answer.count;
			});

			if (total == 0) {
				return 0;
			}
			total = (answers[index].count / total) * 100;
			return total - 0.5;
		},
		color: function(answers, index) {
			if (answers.length == 2) {
				if (index == 0) {
					return "blue";
				}
				return "red";
			}

			if (answers.length == 3) {
				if (index == 0) {
					return "blue";
				}
				if (index == 1) {
					return "green";
				}
				return "red";
			}

			if (answers.length == 4) {
				if (index == 0) {
					return "blue";
				}
				if (index == 1) {
					return "green";
				}
				if (index == 2) {
					return "yellow";
				}
				return "red";
			}
		}
	}
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function(req, res) {
	var postsCollection = mongoDB.collection('posts');
	postsCollection.find({}).toArray(function(err, postsDocs) {
		res.status(200).render('postsPage', {
			cards: postsDocs,
			homeActive: "true",
		});
	});

});

app.get('/post/:id/vote/:answer', function(req, res) {
	var id = new Mongo.ObjectID(req.params.id);
	var answer = req.params.answer;
	var postsCollection = mongoDB.collection('posts');
	var query = {};
	query["answers." + answer + ".count"] = 1;

	postsCollection.updateOne({ "_id": id }, { $inc: query }, function(err, result) {
		if (err) {
			console.log(err);
		} else {
			res.redirect("/post/" + id);
		}
	});
});

app.get('/post/:id', function(req, res) {
	var id = new Mongo.ObjectID(req.params.id);
	var postsCollection = mongoDB.collection('posts');

	postsCollection.findOne({ "_id": id }, function(err, result) {
		if (err) {
			console.log(err);
		} else {
			res.status(200).render('singlePost', {
				post: result
			});
		}
	});
});

app.post('/newpost', function(req, res, next) {
	if (req.body && req.body.text && req.body.answers) {
		var postsCollection = mongoDB.collection('posts');
		postsCollection.insertOne(req.body);
		res.status(200).send("Success");
	} else {
		res.status(400).send("Request needs a body with a URL and caption");
	}
});

app.get('*', function(req, res) {
	res.status(404).render('error');
});


MongoClient.connect(mongoURL, { useNewUrlParser: true }, function(err, client) {
	if (err) {
		throw err;
	}
	mongoDB = client.db(mongoDBName);
	app.listen(port, function() {
		console.log("== Server listening on port", port);
	});
});
