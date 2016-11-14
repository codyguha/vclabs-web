var express = require('express');
var app = express();
var path = require('path');

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

app.post('/Jobapp', function (req, res) {
		alert('APPLICATION SUBMITTED SUCCESSFULLY!')
		res.sendFile(path.join(__dirname + '/index.html'));
});


app.listen(process.env.PORT || 5000, function () {
});