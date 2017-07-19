var express = require('express');
var router = express.Router();
var path = require('path');
var job = require(path.resolve('./APIs/job.js'));

/** [GET] 
 * Get all Jobs
 * http://localhost:3000/api/job
 * Headers: x-access-token (JWT Token) | For Testing - userid
 */
router.get('/', function (req, res, next) {
  var userid = req.headers.userid;
  job.getFilteredJob(userid)
    .then(function (data) {
      var response = { success: true, result: JSON.parse(data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
  // job.getAllJob()
  //   .then(function (data) {
  //     var response = { success: true, result: JSON.parse(data) };
  //     res.status(200).send(response);
  //   }).catch(function (error) {
  //     var response = { success: false, message: error };
  //     res.send(response);
  //   });
});

/** 
 * [POST]
 * Add Job
 * http://localhost:3000/api/job
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
  job.addJob(salary, newJob, req.body.IndustryID, req.body.JobFunctionID)
    .then(function (data) {
      var response = { success: true, result: JSON.parse(data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
});

/* Get One Job by Id
 * http://localhost:3000/api/job/1
 * Params: /id
 * id - id of the job
*/
router.get('/one/:id', function (req, res, next) {
  job.getOneJob(req.params.id)
    .then(function (data) {
      var response = { success: true, result: JSON.parse(data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
});

/* Get Filtered Jobs
 * http://localhost:3000/api/job/filter
*/
// router.post('/filter', function (req, res, next) {
//   job.getUserJob(['Aerospace', 'Construction'], [], [])
//     .then(function (data) {
//       var response = { success: true, result: JSON.parse(data) };
//       res.status(200).send(response);
//     }).catch(function (error) {
//       var response = { success: false, message: error };
//       res.send(response);
//     });
// });

module.exports = router;
