var express = require('express');
var router = express.Router();
var Company = require('../models').Company;

/* Get all Companies
 * http://localhost:3000/api/company
*/
router.get('/', function (req, res, next) {
  Company.findAll({})
    .then((data) => {
      console.log(data);
      res.send(JSON.stringify(data));
    })
});

/* Get One Company by Id
 * http://localhost:3000/api/company/1
*/
router.get('/:id', function (req, res, next) {
  Company.findById(req.params.id)
    .then((data) => {
      console.log(data);
      res.send(JSON.stringify(data));
    })
});

module.exports = router;
