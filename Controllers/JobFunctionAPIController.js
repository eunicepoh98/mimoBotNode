var express = require('express');
var router = express.Router();
var path = require('path');
var jobfunction = require(path.resolve('./APIs/jobfunction.js'));

/* Get all JobFunctions
 * http://localhost:3000/api/jobfunction
*/
router.get('/', function (req, res, next) {
  jobfunction.getAllJobFunction()
    .then(function (data) {
      var response = { success: true, result: JSON.parse(data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
});

/* Get One JobFunction by Id
 * http://localhost:3000/api/jobfunction/1
 * Params: /id
 * id - id of the job function
*/
router.get('/:id', function (req, res, next) {
  jobfunction.getOneJobFunction(req.params.id)
    .then(function (data) {
      var response = { success: true, result: JSON.parse(data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
});

/** 
 * Add JobFunction
 * http://localhost:3000/api/jobfunction
 * Body: JSON(application/json)
 * {
	    "JobfunctionName": ""
   }
*/
router.post('/', function (req, res, next) {
  var jf = {
    JobFunctionName: req.body.JobfunctionName
  };
  jobfunction.addJobFunction(jf)
    .then(function (data) {
      var response = { success: true, result: JSON.parse(data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
});

module.exports = router;
