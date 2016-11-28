var express = require('express');
var mongodb = require('mongodb');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://cody%40vclabs.ca:secretl0l@smtpout.secureserver.net');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"Fred Foo 👥" <foo@blurdybloop.com>', // sender address
    to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world 🐴', // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
};

app.get('/website', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/jobs', function (req, res) {
  res.sendFile(path.join(__dirname + '/jobs.html'));
});

app.get('/success',function(req,res){
   res.sendFile(path.join(__dirname + '/success.html'));
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
    // send mail with defined transport object
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
