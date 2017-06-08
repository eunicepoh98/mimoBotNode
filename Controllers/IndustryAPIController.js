var express = require('express');
var router = express.Router();
var Industry = require('../models').Industry;

/* Get all Industries
 * http://localhost:3000/api/industry
*/
router.get('/', function (req, res, next) {
  Industry.findAll({})
    .then((data) => {
      console.log(JSON.stringify(data));
      res.json(data);
    })
});

/* Get One Industry by Id
 * http://localhost:3000/api/industry/1
*/
router.get('/:id', function (req, res, next) {
  Industry.findById(req.params.id)
    .then((data) => {
      console.log(data);
      res.send(JSON.stringify(data));
    })
});

module.exports = router;
