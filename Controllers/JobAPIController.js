var express = require('express');
var router = express.Router();
var path = require('path');
var job = require(path.resolve('./APIs/job.js'));
var token = require('../token.js');
var company = require(path.resolve('./APIs/company.js'));

/** [GET] 
 * Get all Jobs
 * http://localhost:8680/api/job
 * Headers: x-access-token (JWT Token) | For Testing - userid
 */
router.get('/', token.verifyToken, function (req, res, next) {
  var userid = req.headers.userid;
  if (!userid) { res.send({ success: false, message: "Something went wrong" }) }
  job.getFilteredJob(userid)
    .then(function (data) {
      var response = { success: true, result: JSON.parse(data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error.msg, errMessage: error.errMsg ? error.errMsg : "" };
      res.send(response);
    });
  // job.getUserJob(['Aerospace', 'Construction'], [], [], userid)
  //   .then(function (data) {
  //     var response = { success: true, result: JSON.parse(data) };
  //     res.status(200).send(response);
  //   }).catch(function (error) {
  //     var response = { success: false, message: error.msg, errMessage: error.errMsg ? error.errMsg : "" };
  //     res.send(response);
  //   });
  // job.getAllJob()
  //   .then(function (data) {
  //     var response = { success: true, result: JSON.parse(data) };
  //     res.status(200).send(response);
  //   }).catch(function (error) {
  //     var response = { success: false, message: error.msg, errMessage: error.errMsg ? error.errMsg : "" };
  //     res.send(response);
  //   });
});

/** 
 * [POST]
 * Add Job
 * http://localhost:8680/api/job/add
 * Body: JSON(application/json)
 * {
	    "JobTitle": "",
      "JobDescription": "",
      "JobQualification": "",
      "JobResponsibilities": "",
      "JobPostalCode": "",
      "JobAddress": "",
      "SalaryFrom": 600,
      "SalaryTo": 800,
      "CurrencyID": 1,
      "CompanyID": 1,
      "CountryID": 1,
      "JobTypeID": 1,
      "IndustryID": [],
      "JobFunctionID": [] 
   }
*/
router.post('/add', function (req, res, next) {
  var salary = {
    SalaryFrom: req.body.SalaryFrom,
    SalaryTo: req.body.SalaryTo,
    CurrencyID: req.body.CurrencyID
  };
  var newJob = {
    JobTitle: req.body.JobTitle,
    JobDescription: req.body.JobDescription,
    JobQualification: req.body.JobQualification,
    JobResponsibilities: req.body.JobResponsibilities,
    JobPostalCode: req.body.JobPostalCode,
    JobAddress: req.body.JobAddress,
    CompanyID: req.body.CompanyID,
    JobTypeID: req.body.JobTypeID,
    CountryID: req.body.CountryID
  };
  job.addJob(salary, newJob, req.body.IndustryID, req.body.JobFunctionID)
    .then(function (data) {
      var response = { success: true, result: JSON.parse(data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error.msg, errMessage: error.errMsg ? error.errMsg : "" };
      res.send(response);
    });
});

/** 
 * [POST]
 * Add Job
 * http://localhost:8680/api/job
 * Body: JSON(application/json)
 * {
	    "JobTitle": "",
      "JobDescription": "",
      "JobQualification": "",
      "JobResponsibilities": "",
      "JobPostalCode": "",
      "JobAddress": "",
      "SalaryFrom": 600,
      "SalaryTo": 800,
      "CurrencyID": 1,
      "JobTypeID": 1,
      "IndustryID": [],
      "JobFunctionID": [],
      "CompanyName": "",
      "CompanyAddress": "",
      "CompanyPostalCode": ""
   }
*/
router.post('/', function (req, res, next) {
  var salary = {
    SalaryFrom: req.body.SalaryFrom,
    SalaryTo: req.body.SalaryTo,
    CurrencyID: req.body.CurrencyID
  }
  var newJob = {
    JobTitle: req.body.JobTitle,
    JobDescription: req.body.JobDescription,
    JobQualification: req.body.JobQualification,
    JobResponsibilities: req.body.JobResponsibilities,
    JobPostalCode: req.body.JobPostalCode,
    JobAddress: req.body.JobAddress,
    JobTypeID: req.body.JobTypeID
  };
  var com = {
    CompanyName: req.body.CompanyName,
    CompanyAddress: req.body.CompanyAddress,
    CompanyPostalCode: req.body.CompanyPostalCode
  };
  company.addCompany(com)
    .then(function (comdata) {
      newJob.CompanyID = comdata.CompanyID;
      job.addJob(salary, newJob, req.body.IndustryID, req.body.JobFunctionID)
        .then(function (data) {
          var response = { success: true, result: JSON.parse(data) };
          res.status(200).send(response);
        }).catch(function (error) {
          var response = { success: false, message: error.msg, errMessage: error.errMsg ? error.errMsg : "" };
          res.send(response);
        });
    }).catch(function (error) {
      var response = { success: false, message: error.msg, errMessage: error.errMsg ? error.errMsg : "" };
      res.send(response);
    });
});

/* Get One Job by Id
 * http://localhost:8680/api/job/1
 * Params: /id
 * id - id of the job
*/
router.get('/:id', function (req, res, next) {
  job.getOneJob(req.params.id)
    .then(function (data) {
      var response = { success: true, result: JSON.parse(data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error.msg, errMessage: error.errMsg ? error.errMsg : "" };
      res.send(response);
    });
});


module.exports = router;
