var express = require('express');
var router = express.Router();
var path = require('path');
var resume = require(path.resolve('./APIs/resume.js'));

/**
 * [GET]
 * Get all resume of user
 * http://localhost:3000/api/resume/1
 * Params: /id
 * id - id of the user
 */
router.get('/:id', function (req, res, next) {
  resume.getAllResume(req.params.id)
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
 * Add Resume
 * http://localhost:3000/api/resume/1
 * Params: /id
 * id - id of the user
 * Body: JSON(application/json)
 * {
	    "Description": ""
   }
*/
router.post('/:id', function (req, res, next) {
  resume.addResume(req.params.id, req.body.Description)
    .then(function (data) {
      var response = { success: true, message: 'Successfully added resume', result: JSON.parse(data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
});

/** 
 * [PUT]
 * Update Resume
 * http://localhost:3000/api/resume/1
 * Params: /id
 * id - id of the user
 * Body: JSON(application/json)
 * {
	    "Description": ""
   }
*/
router.put('/:id', function (req, res) {
  resume.updateAttributes(req.params.id, req.body.Description)
    .then(function (data) {
      var response = { success: true, message: 'Successfully updated resume details', result: JSON.parse(data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
});

/**
 * [DELETE]
 * Delete Resume
 * http://localhost:3000/api/resume/1
 * Params: /id
 * id - id of the work experience
 */
router.delete('/:id', function (req, res) {
  resume.deleteResume(req.params.id)
    .then(function (data) {
      var response = { success: true, message: 'Successfully deleted resume', result: JSON.parse(data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
});

module.exports = router;