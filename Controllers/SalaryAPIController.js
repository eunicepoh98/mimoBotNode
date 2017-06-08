var express = require('express');
var router = express.Router();
var Salary = require('../models').Salary;

/* Get all Salaries
 * http://localhost:3000/api/salary
 * I dont think i need to get all the salaries :D
*/
router.get('/', function (req, res, next) {
  Salary.findAll({})
    .then((data) => {
      console.log(JSON.stringify(data));
      res.json(data);
    })
});

/* Get One Salary by Id
 * http://localhost:3000/api/salary/1
*/
router.get('/:id', function (req, res, next) {
  Salary.findById(req.params.id)
    .then((data) => {
      console.log(data);
      res.send(JSON.stringify(data));
    })
});

module.exports = router;
