var express = require('express');
var router = express.Router();
var path = require('path');
var company = require(path.resolve('./APIs/company.js'));

/**
 * Get all Companies
 * http://localhost:3000/api/company
 */
router.get('/', function (req, res, next) {
  company.getAllCompany()
    .then(function (data) {
      var response = { success: true, result: JSON.parse(data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
});

/**
 * Get One Company by Id
 * http://localhost:3000/api/company/1
 * Params: /id
 * id - id of the company
 */
router.get('/:id', function (req, res, next) {
  company.getOneCompany(req.params.id)
    .then(function (data) {
      var response = { success: true, result: JSON.parse(data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
});

/**
 * Add Company
 * http://localhost:3000/api/company
 * Body: JSON(application/json)
 * {
	    "CompanyName": "",
      "CompanyAddress": "",
      "CompanyPostalCode": ""
   }
 */
router.post('/', function (req, res, next) {
  var com = {
    CompanyName: req.body.CompanyName,
    CompanyAddress: req.body.CompanyAddress,
    CompanyPostalCode: req.body.CompanyPostalCode
  };
  company.addCompany(com)
    .then(function (data) {
      var response = { success: true, result: JSON.parse(data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
})

module.exports = router;
