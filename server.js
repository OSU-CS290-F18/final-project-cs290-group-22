var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var fs = require('fs');
var app = express();
var MongoClient = require('mongodb').MongoClient;
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
var postData = JSON.parse(rawData); //get the post data

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
	res.status(200).render('postsPage', {
		photos: postData,
		index: 1
	});
});

app.get('/posts/:index', function(req, res) {
	var index = req.params.index;
	var singlePostArray = [];
	if (postData[index]) {
		singlePostArray.push(postData[index]);
		res.status(200).render('postsPage', {
			photos: singlePostArray,
			index: 0
		});
	} else {
		res.status(404).render('error');
	}
});

app.use(express.static('public'));

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
