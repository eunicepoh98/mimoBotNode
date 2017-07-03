var express = require('express');
var router = express.Router();
var path = require('path');
var industry = require(path.resolve('./APIs/industry.js')).api;

/* Get all Industries
 * http://localhost:3000/api/industry
*/
router.get('/', function (req, res, next) {
  industry.getAllIndustry().then(function (data) {
    res.send(data)
  })
});

/* Get One Industry by Id
 * http://localhost:3000/api/industry/1
*/
router.get('/:id', function (req, res, next) {
  industry.getOneIndustry(req.params.id).then(function (data) {
    res.send(data)
  })
});

/* Add Industry
 * http://localhost:3000/api/industry
 * {
	    "IndustryName": ""
   }
*/
router.post('/', function (req, res, next) {
  var ind = {
    IndustryName: req.body.IndustryName
  };
  industry.addIndustry(ind).then(function (result) {
    res.send(result)
  })
})

module.exports = router;
