var express = require('express');
var router = express.Router();
var path = require('path');
var job = require(path.resolve('./APIs/job.js')).api;

/* Get all Jobs
 * http://localhost:3000/api/job
*/
router.get('/', function (req, res, next) {
  job.getAllJob().then(function (data) {
    res.send(data)
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

/* Get One Job by Id
 * http://localhost:3000/api/job/1
*/
router.get('/filter', function (req, res, next) {
  job.getFilteredJob().then(function (data) {
    res.send(data)
  })
});

module.exports = router;
