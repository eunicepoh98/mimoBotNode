var express = require('express');
var router = express.Router();
var path = require('path');
var jobtype = require(path.resolve('./APIs/jobtype.js'));

/** 
 * Get all JobTypes
 * http://localhost:3000/api/jobtype
*/
router.get('/', function (req, res, next) {
  jobtype.getAllJobType()
    .then(function (data) {
      var response = { success: true, result: JSON.parse(data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
});

/**
 * Get One JobType by Id
 * http://localhost:3000/api/jobtype/1
 * Params: /id
 * id - id of the job type
*/
router.get('/:id', function (req, res, next) {
  jobtype.getOneJobType(req.params.id)
    .then(function (data) {
      var response = { success: true, result: JSON.parse(data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
});

/**
 * Add JobType
 * http://localhost:3000/api/jobtype
 * Body: JSON(application/json)
 * {
	    "JobType": ""
   }
*/
router.post('/', function (req, res, next) {
  var jt = {
    JobType: req.body.JobType
  };
  jobtype.addJobType(jt)
    .then(function (data) {
      var response = { success: true, result: JSON.parse(data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
})

module.exports = router;
