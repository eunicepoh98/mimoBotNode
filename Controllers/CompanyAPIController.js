var express = require('express');
var router = express.Router();
var path = require('path');
var company = require(path.resolve('./APIs/company.js')).api;

/* Get all Companies
 * http://localhost:3000/api/company
*/
router.get('/', function (req, res, next) {
  company.getAllCompany().then(function (data) {
    res.send(data)
  })
});

/* Get One Company by Id
 * http://localhost:3000/api/company/1
*/
router.get('/:id', function (req, res, next) {
  company.getOneCompany(req.params.id).then(function (data) {
    res.send(data)
  })
});

/* Add Company
 * http://localhost:3000/api/company
 * {
	    "CompanyName": "",
      "CompanyAddress": "",
      CompanyPostalCode: "",
   }
*/
router.post('/', function (req, res, next) {
  var com = {
    CompanyName: req.body.CompanyName,
    CompanyAddress: req.body.CompanyAddress,
    CompanyPostalCode: req.body.CompanyPostalCode
  };
  company.addCompany(com).then(function (result) {
    res.send(result)
  })
})

module.exports = router;
