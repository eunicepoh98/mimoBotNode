var express = require('express');
var router = express.Router();
var path = require('path');
var industry = require(path.resolve('./APIs/industry.js'));

/** 
 * Get all Industries
 * http://localhost:3000/api/industry
*/
router.get('/', function (req, res, next) {
  industry.getAllIndustry()
    .then(function (data) {
      var response = { success: true, result: JSON.parse(data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
});

/** 
 * Get One Industry by Id
 * http://localhost:3000/api/industry/1
 * Params: /id
 * id - id of the industry
*/
router.get('/:id', function (req, res, next) {
  industry.getOneIndustry(req.params.id)
    .then(function (data) {
      var response = { success: true, result: JSON.parse(data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
});

/** 
 * Add Industry
 * http://localhost:3000/api/industry
 * Body: JSON(application/json)
 * {
	    "IndustryName": ""
   }
*/
router.post('/', function (req, res, next) {
  var ind = {
    IndustryName: req.body.IndustryName
  };
  industry.addIndustry(ind)
    .then(function (data) {
      var response = { success: true, result: JSON.parse(data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
});

module.exports = router;
