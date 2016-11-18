var express = require('express');
var mongodb = require('mongodb');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname + '/index.html'));
// });

app.get('/website', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/jobs', function (req, res) {
  res.sendFile(path.join(__dirname + '/jobs.html'));
});

app.get('/taketenvideo', function (req, res) {
  res.sendFile(path.join(__dirname + '/demo.html'));
});

app.get('/success',function(req,res){
   res.sendFile(path.join(__dirname + '/success.html'));
})
app.get('/denied',function(req,res){
   res.sendFile(path.join(__dirname + '/denied.html'));
})

app.post('/backdoor',function(req,res){
  console.log(JSON.stringify(req.body))
   var username = req.body.username
   var password = req.body.password
   console.log(username, password)
   if (username === "user007" || password === "12345678"){
      res.redirect('/taketenvideo');
   } else {
      res.redirect('/denied');
   }
})

app.post('/jobapp',function(req,res){
	console.log(JSON.stringify(req.body))
   var application = req.body //you will get your data in this as object.
   res.redirect('/success');
   mongodb.MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
		if (err) throw err;
		var applications = db.collection('applications');
		applications.insert({application})
	})
})

app.post('/contact',function(req,res){
	console.log(JSON.stringify(req.body))
   var application = req.body //you will get your data in this as object.
   res.redirect('/success');
   mongodb.MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
		if (err) throw err;
		var contact = db.collection('contacts');
		applications.insert({contact})
	})
})

app.listen(process.env.PORT || 5000, function () {
});