var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');

var app = express();

// For BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
//var port = process.env.VCAP_APP_PORT || 3000;
var port = process.env.VCAP_APP_PORT || 8680;

// Routes
var jobs = require('./Controllers/JobAPIController');
var jobtypes = require('./Controllers/JobTypeAPIController');
var jobfunctions = require('./Controllers/JobFunctionAPIController');
var industries = require('./Controllers/IndustryAPIController');
var companies = require('./Controllers/CompanyAPIController');
var countries = require('./Controllers/CountryAPIController');
var workexperiences = require('./Controllers/WorkExperienceAPIController');
var users = require('./Controllers/UserAPIController');
var bookmarks = require('./Controllers/BookmarkAPIController');
var resumes = require('./Controllers/ResumeAPIController');
var applications = require('./Controllers/ApplicationAPIController');
var notifications = require('./Controllers/NotificationAPIController');
var wit = require('./Controllers/WitAPIController');
var authentication = require('./Controllers/AuthenticationAPIController');

// JWT
var token = require('./token.js');

app.use('/', authentication);
app.use('/api/job', jobs);
app.use('/api/jobtype', jobtypes);
app.use('/api/jobfunction', jobfunctions);
app.use('/api/industry', industries);
app.use('/api/company', companies);
app.use('/api/country', countries);
app.use('/api/workexperience', token.verifyToken, workexperiences);
app.use('/api/user', token.verifyToken, users);
app.use('/api/bookmark', token.verifyToken, bookmarks);
app.use('/api/resume', token.verifyToken, resumes);
app.use('/api/application', token.verifyToken, applications);
app.use('/api/notification', notifications);
app.use('/api/wit', token.verifyToken, wit);


// Load Passport Strategies
require('./passport.js')(passport);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(port);
console.log('Magic happens on port ' + port);

module.exports = app;
