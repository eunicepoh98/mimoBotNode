var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');

var jobs = require('./Controllers/JobAPIController');
var jobtypes = require('./Controllers/JobTypeAPIController');
var jobfunctions = require('./Controllers/JobFunctionAPIController');
var industries = require('./Controllers/IndustryAPIController');
var companies = require('./Controllers/CompanyAPIController');
var wit = require('./Controllers/WitAPIController');

var app = express();

//app.set('models', require('./Models'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
var port = process.env.VCAP_APP_PORT || 3000;

app.use('/api/job', jobs);
app.use('/api/jobtype', jobtypes);
app.use('/api/jobfunction', jobfunctions);
app.use('/api/industry', industries);
app.use('/api/company', companies);
app.use('/api/wit', wit);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(port);
console.log('Magic happens on port ' + port);

app.get('/', function(req, res){
  res.send('Available')
})

module.exports = app;
