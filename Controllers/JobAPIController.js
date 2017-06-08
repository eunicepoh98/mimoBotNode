var express = require('express');
var router = express.Router();
var Job = require('../models').Job;

/* Get all Jobs
 * http://localhost:3000/api/jobs
*/
router.get('/', function (req, res, next) {
  Job.findAll({})
    .then((data) => {
      console.log(data);
      res.send(JSON.stringify(data));
    })
});

/* Get One Job by Id
 * http://localhost:3000/api/jobs/1
*/
router.get('/:id', function (req, res, next) {
  Job.findById(req.params.id)
    .then((data) => {
      console.log(data);
      res.send(JSON.stringify(data));
    })
});

module.exports = router;
