var express = require('express');
var router = express.Router();
var path = require('path');
var workexperience = require(path.resolve('./APIs/workexperience.js'));

/**
 * [GET]
 * Get all WorkExperience of 1 user
 * http://localhost:3000/api/workexperience/user/1
 * Params: /id
 * id - id of the user
 */
router.get('/user/:id', function (req, res, next) {
    workexperience.getAllWorkExperience(req.params.id)
        .then(function (data) {
            var response = { success: true, result: JSON.parse(data) };
            res.status(200).send(response);
        }).catch(function (error) {
            var response = { success: false, message: error };
            res.send(response);
        });
});

/**
 * [GET]
 * Get One WorkExperience by Id
 * http://localhost:3000/api/workexperience/one/1
 * Params: /id
 * id - id of the work experience
 */
router.get('/one/:id', function (req, res, next) {
    workexperience.getOneWorkExperience()
        .then(function (data) {
            var response = { success: true, result: JSON.parse(data) };
            res.status(200).send(response);
        }).catch(function (error) {
            var response = { success: false, message: error };
            res.send(response);
        });
});

/**
 * [POST]
 * Add WorkExperience
 * http://localhost:3000/api/workexperience
 * Body: JSON(application/json)
 * {
	  "CompanyName": "",
      "Role": "",
      "Description": "",
      "StartDate": "",
      "EndDate": "",
      "UserID": ""
   }
 */
router.post('/', function (req, res, next) {
    var we = {
        CompanyName: req.body.CompanyName,
        Role: req.body.Role,
        Description: req.body.Description,
        StartDate: req.body.StartDate,
        EndDate: req.body.EndDate,
        UserID: req.body.UserID
    };
    workexperience.addWorkExperience(we)
        .then(function (data) {
            var response = { success: true, message: 'Successfully added work experience', result: JSON.parse(data) };
            res.status(200).send(response);
        }).catch(function (error) {
            var response = { success: false, message: error };
            res.send(response);
        });
});

/**
 * [PUT]
 * Update WorkExperience
 * http://localhost:3000/api/workexperience/1
 * Params: /id
 * id - id of the work experience
 * Body: JSON(application/json)
 * {
	  "CompanyName": "",
      "Role": "",
      "Description": "",
      "StartDate": "",
      "EndDate": "",
      "UserID": ""
   }
 */
router.put('/:id', function (req, res) {
    var we = {
        CompanyName: req.body.CompanyName,
        Description: req.body.Description,
        StartDate: req.body.StartDate,
        EndDate: req.body.EndDate,
        UserID: req.body.UserID
    }
    workexperience.updateAttributes(req.params.id, we)
        .then(function (data) {
            var response = { success: true, message: 'Successfully updated work experience', result: JSON.parse(data) };
            res.status(200).send(response);
        }).catch(function (error) {
            var response = { success: false, message: error };
            res.send(response);
        });
});

/**
 * [DELETE]
 * Delete WorkExperience
 * http://localhost:3000/api/workexperience/1
 * Params: /id
 * id - id of the work experience
 */
router.delete('/:id', function (req, res) {
    workexperience.delete(req.params.id)
        .then(function (data) {
            var response = { success: true, message: 'Successfully deleted work experience', result: JSON.parse(data) };
            res.status(200).send(response);
        }).catch(function (error) {
            var response = { success: false, message: error };
            res.send(response);
        });
});

module.exports = router;