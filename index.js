var express = require('express');
var mongodb = require('mongodb');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var wellknown = require('nodemailer-wellknown');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
  service: 'godaddy'
});

var config = wellknown('Godaddy');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname + '/index.html'));
// });

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"Fred Foo 👥" <foo@blurdybloop.com>', // sender address
    to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world 🐴', // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
};

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
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    })
	})
})

app.listen(process.env.PORT || 5000, function () {
});
