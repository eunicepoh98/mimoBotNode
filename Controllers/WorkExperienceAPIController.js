var express = require('express');
var router = express.Router();
var path = require('path');
var workexperience = require(path.resolve('./APIs/workexperience.js'));

/**
 * [GET]
 * Get all WorkExperience of 1 user
 * http://localhost:8680/api/workexperience
 * Headers: x-access-token (JWT Token) | For Testing - userid
 */
router.get('/', function (req, res, next) {
    var userid = req.headers.userid;
  if (!userid) { res.send({ success: false, message: "Something went wrong" }) }
    workexperience.getAllWorkExperience(userid)
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
 * http://localhost:8680/api/workexperience
 * Headers: x-access-token (JWT Token) | For Testing - userid
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
    var userid = req.headers.userid;
  if (!userid) { res.send({ success: false, message: "Something went wrong" }) }
    var we = {
        CompanyName: req.body.CompanyName,
        Role: req.body.Role,
        Description: req.body.Description,
        StartDate: req.body.StartDate,
        EndDate: req.body.EndDate,
        UserID: userid
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
 * http://localhost:8680/api/workexperience/id
 * Headers: x-access-token (JWT Token) | For Testing - userid
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
    var userid = req.headers.userid;
  if (!userid) { res.send({ success: false, message: "Something went wrong" }) }
    var we = {
        CompanyName: req.body.CompanyName,
        Description: req.body.Description,
        Role: req.body.Role,
        StartDate: req.body.StartDate,
        EndDate: req.body.EndDate,
        UserID: userid
    }
    workexperience.updateAttributes(req.params.id, we)
        .then(function (data) {
            var response = { success: true, message: "Successfully updated work experience", result: JSON.parse(data) };
            res.status(200).send(response);
        }).catch(function (error) {
            var response = { success: false, message: error };
            res.send(response);
        });
});

/**
 * [DELETE]
 * Delete WorkExperience
 * http://localhost:8680/api/workexperience/1
 * Headers: x-access-token (JWT Token) | For Testing - userid
 * Params: workexperience id
 */
router.delete('/:id', function (req, res) {
    workexperience.deleteWorkExperience(req.params.id)
        .then(function (data) {
            var response = { success: true, message: "Successfully deleted work experience", result: JSON.parse(data) };
            res.status(200).send(response);
        }).catch(function (error) {
            var response = { success: false, message: error };
            res.send(response);
        });
});

module.exports = router;