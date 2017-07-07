var express = require('express');
var router = express.Router();
var Country = require('../models').Country;

/* Get all Countries
 * http://localhost:3000/api/country
*/
router.get('/', function (req, res, next) {
  Country.findAll({})
    .then(function (data) {
      console.log(data);
      res.send(JSON.stringify(data));
    })
});

/* Get One Country by Id
 * http://localhost:3000/api/country/1
*/
router.get('/:id', function (req, res, next) {
  Country.findById(req.params.id)
    .then(function (data) {
      console.log(data);
      res.send(JSON.stringify(data));
    })
});

module.exports = router;
