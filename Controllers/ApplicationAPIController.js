var express = require('express');
var router = express.Router();
var path = require('path');
var application = require(path.resolve('./APIs/application.js'));

/**
 * [GET]
 * Get all User Applications
 * http://localhost:3000/api/application/1
 * Params: /id
 * id - user id
 */
router.get('/:id', function (req, res, next) {
  application.getAllApplication(req.params.id)
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
 * http://localhost:3000/api/application
 * Body: JSON(application/json)
 * {
      "JobID": 1,
      "UserID": 1,
      "ResumeID": 1          
   }
 */
router.post('/', function (req, res, next) {
  var newapplication = {
    JobID: req.body.JobID,
    UserID: req.body.UserID,
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