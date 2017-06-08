var express = require('express');
var router = express.Router();
var JobType = require('../models').JobType;

/* Get all JobTypes
 * http://localhost:3000/api/jobtype
*/
router.get('/', function (req, res, next) {
  JobType.findAll({})
    .then((data) => {
      console.log(data);
      res.send(JSON.stringify(data));
    })
});

/* Get One JobType by Id
 * http://localhost:3000/api/jobtype/1
*/
router.get('/:id', function (req, res, next) {
  JobType.findById(req.params.id)
    .then((data) => {
      console.log(data);
      res.send(JSON.stringify(data));
    })
});

module.exports = router;
