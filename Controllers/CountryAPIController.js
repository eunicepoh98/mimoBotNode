var express = require('express');
var router = express.Router();
var path = require('path');
var country = require(path.resolve('./APIs/country.js'));

/**
 * Get all Countries
 * http://localhost:8680/api/country
 */
router.get('/', function (req, res, next) {
  country.getAllCountry()
    .then(function (data) {
      var response = { success: true, result: JSON.parse(data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
});

/**
 * Get all Countries Name
 * http://localhost:8680/api/country/name
 */
router.get('/name', function (req, res, next) {
  country.getAllCountryName()
    .then(function (data) {
      var response = { success: true, result: data };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
});

/**
 * Get One Country by Id
 * http://localhost:8680/api/country/one/1
 * Params: /id
 * id - id of the country
 */
router.get('/one/:id', function (req, res, next) {
  country.getOneCountry(req.params.id)
    .then(function (data) {
      var response = { success: true, result: JSON.parse(data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
});

/**
 * Add Country
 * http://localhost:8680/api/country
 * Body: JSON(application/json)
 * {
	    "CountryName": ""
   }
 */
router.post('/', function (req, res, next) {
  var com = {
    CountryName: req.body.CountryName
  };
  country.addCountry(com)
    .then(function (data) {
      var response = { success: true, result: JSON.parse(data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
});

module.exports = router;
