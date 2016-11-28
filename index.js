var express = require('express');
var mongodb = require('mongodb');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var api_key = 'key-ee95f4d7aef1d9c11d3a8ef94a9bd687';
var domain = 'sandbox771cbaa483844883b70b3cf9f943c042.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname + '/index.html'));
// });

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/jobs', function (req, res) {
  res.sendFile(path.join(__dirname + '/jobs.html'));
});

app.get('/backstage', function (req, res) {
  res.sendFile(path.join(__dirname + '/demo.html'));
});

app.get('/success',function(req,res){
   res.sendFile(path.join(__dirname + '/success.html'));
})
app.get('/noaccess',function(req,res){
   res.sendFile(path.join(__dirname + '/deny.html'));
})

app.post('/backdoor',function(req,res){
  console.log(JSON.stringify(req.body))
   var password = req.body.password
   if (password === "Vancity1abs"){
      res.redirect('/backstage');
   } else {
      res.redirect('/noaccess');
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
   var contact = req.body //you will get your data in this as object.
   res.redirect('/success');
   mongodb.MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
		if (err) throw err;
		var contacts = db.collection('contacts');
		contacts.insert({contact})
	})
  var data = {
    from: 'Excited User <'+req.body.email+'>',
    to: 'cody@vclabs.ca',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomness!'
  };
  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
})

app.listen(process.env.PORT || 5000, function () {
});
