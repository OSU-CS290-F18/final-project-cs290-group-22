/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Matthew Jordan
 * Email: jordanma@oregonstate.edu
 */

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var fs = require('fs');
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var port = process.env.PORT || 3000;

var rawData = fs.readFileSync('./postData.json');
var postData = JSON.parse(rawData); //get the post data


app.get('/', function (req, res) {
        res.status(200).render('photoPage', {
            photos: postData,
            index: 1
        });
});

app.get('/posts/:index', function (req, res) {
  var index = req.params.index;
  var singlePostArray = [];
  if (postData[index]) {
      singlePostArray.push(postData[index]);
      res.status(200).render('photoPage', {
        photos: singlePostArray,
        index: 0
      });
  } else {
    res.status(404).render('error');
  }
});

app.use(express.static('public'));

app.get('*', function (req, res) {
  res.status(404).render('error');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
