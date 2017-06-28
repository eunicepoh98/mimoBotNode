var express = require('express');
var router = express.Router();
var path = require('path');
var jobfunction = require(path.resolve('./APIs/jobfunction.js')).api;

/* Get all JobFunctions
 * http://localhost:3000/api/jobfunction
*/
router.get('/', function (req, res, next) {
  jobfunction.getAllJobFunction().then(function (data) {
    res.send(data)
  })
});

/* Get One JobFunction by Id
 * http://localhost:3000/api/jobfunction/1
*/
router.get('/:id', function (req, res, next) {
  jobfunction.getOneJobFunction(req.params.id).then(function (data) {
    res.send(data)
  })
});

module.exports = router;
