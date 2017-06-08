var express = require('express');
var router = express.Router();
var JobFunction = require('../models').JobFunction;

/* Get all JobFunctions
 * http://localhost:3000/api/jobfunction
*/
router.get('/', function (req, res, next) {
  JobFunction.findAll({})
    .then((data) => {
      console.log(data);
      res.send(JSON.stringify(data));
    })
});

/* Get One JobFunction by Id
 * http://localhost:3000/api/jobfunction/1
*/
router.get('/:id', function (req, res, next) {
  JobFunction.findById(req.params.id)
    .then((data) => {
      console.log(data);
      res.send(JSON.stringify(data));
    })
});

module.exports = router;
