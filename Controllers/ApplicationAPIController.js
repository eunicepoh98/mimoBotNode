var express = require('express');
var router = express.Router();
var path = require('path');
var application = require(path.resolve('./APIs/application.js'));

/**
 * [GET]
 * Get all User Applications
 * http://localhost:8680/api/application
 * Headers: x-access-token (JWT Token) | For Testing - userid
 */
router.get('/', function (req, res, next) {
  var userid = req.headers.userid;   
  if (!userid) { res.send({ success: false, message: "Something went wrong" }) }
  application.getAllApplication(userid)
    .then(function (data) {
      var response = { success: true, result: JSON.parse(data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
});

/** 
 * [POST]
 * Add User Application
 * http://localhost:8680/api/application
 * Headers: x-access-token (JWT Token) | For Testing - userid
 * Body: JSON(application/json)
 * {
      "JobID": 1,
      "ResumeID": 1          
   }
 */
router.post('/', function (req, res, next) {
  var userid = req.headers.userid;   
  if (!userid) { res.send({ success: false, message: "Something went wrong" }) }
  var newapplication = {
    JobID: req.body.JobID,
    UserID: userid,
    ResumeID: req.body.ResumeID
  };
  application.sendApplication(newapplication)
    .then(function (data) {
      var response = { success: true, message: 'Job Applied!', result: JSON.parse(data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
});

module.exports = router;