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

module.exports = router;
