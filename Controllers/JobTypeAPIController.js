var express = require('express');
var router = express.Router();
var path = require('path');
var jobtype = require(path.resolve('./APIs/jobtype.js')).api;

/* Get all JobTypes
 * http://localhost:3000/api/jobtype
*/
router.get('/', function (req, res, next) {
  jobtype.getAllJobType().then(function (data) {
    res.send(data)
  })
});

/* Get One JobType by Id
 * http://localhost:3000/api/jobtype/1
*/
router.get('/:id', function (req, res, next) {
  jobtype.getOneJobType(req.params.id).then(function (data) {
    res.send(data)
  })
});

/* Add JobType
 * http://localhost:3000/api/jobtype
 * {
	    "JobType": ""
   }
*/
router.post('/', function (req, res, next) {
  var jt = {
    JobType: req.body.JobType
  };
  jobtype.addJobType(jt).then(function (result) {
    res.send(result)
  })
})

module.exports = router;
