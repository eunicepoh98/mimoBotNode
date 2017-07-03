var express = require('express');
var router = express.Router();
var path = require('path');
var job = require(path.resolve('./APIs/job.js')).api;

/* Get all Jobs
 * http://localhost:3000/api/job
*/
router.get('/', function (req, res, next) {
  job.getAllJob().then(function (data) {
    res.send(JSON.parse(data))
  })
});

/* Get One Job by Id
 * http://localhost:3000/api/job/1
*/
router.get('/one/:id', function (req, res, next) {
  job.getOneJob(req.params.id).then(function (data) {
    res.send(data)
  })
});

/* Get Filtered Jobs
 * http://localhost:3000/api/job/filter
*/
router.get('/filter', function (req, res, next) {
  job.getUserJob().then(function (data) {
    res.send(JSON.parse(data))
  })
});

/* Add Job
 * http://localhost:3000/api/job
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
    CompanyID: req.body.CompanyID,
    JobTypeID: req.body.JobTypeID,
    CountryID: req.body.CountryID
  };
  job.addJob(salary, newJob, req.body.IndustryID, req.body.JobFunctionID).then(function (result) {
    res.send(result)
  }).catch(function(error){
    res.status(404).send(error)
  })
})

module.exports = router;
