var express = require('express');
var router = express.Router();
var path = require('path');
var jobtype = require(path.resolve('./APIs/jobtype.js'));

/** 
 * Get all JobTypes
 * http://localhost:8680/api/jobtype
*/
router.get('/', function (req, res, next) {
  jobtype.getAllJobType()
    .then(function (data) {
      var response = { success: true, result: data };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error.msg, errMessage: error.errMsg ? error.errMsg : "" };
      res.send(response);
    });
});

/**
 * Get One JobType by Id
 * http://localhost:8680/api/jobtype/1
 * Params: /id
 * id - id of the job type
*/
router.get('/:id', function (req, res, next) {
  jobtype.getOneJobType(req.params.id)
    .then(function (data) {
      var response = { success: true, result: data };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error.msg, errMessage: error.errMsg ? error.errMsg : "" };
      res.send(response);
    });
});

/**
 * Add JobType
 * http://localhost:8680/api/jobtype
 * Body: JSON(application/json)
 * {
	    "JobType": "",
      "Synonyms": []
   }
*/
router.post('/', function (req, res, next) {
  var jt = {
    JobType: req.body.JobType,
    Synonyms: req.body.Synonyms
  };
  jobtype.addJobType(jt)
    .then(function (data) {
      var response = { success: true, message: data.msg, result: JSON.parse(data.data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error.msg, errMessage: error.errMsg ? error.errMsg : "" };
      res.send(response);
    });
})

/** 
 * Add JobType Synonyms
 * http://localhost:8680/api/jobtype/synonyms
 * Body: JSON(application/json)
 * {
      "JobTypeID": "",
      "Synonyms": []
   }
*/
router.post('/synonyms', function (req, res, next) {
  jobtype.addJobTypeSynonyms(req.body.JobTypeID, req.body.Synonyms)
    .then(function (data) {
      var response = { success: true, message: data.msg, result: JSON.parse(data.data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error.msg, errMessage: error.errMsg ? error.errMsg : "" };
      res.send(response);
    });
});

module.exports = router;
