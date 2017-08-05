var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');
var moment = require('moment');
var resume = require(path.resolve('./APIs/resume.js'));
var today = moment(new Date()).format("YYYYMMDD")
var upload = multer({ dest: 'uploads/' + today });

/**
 * [GET]
 * Get all resume of user
 * http://localhost:8680/api/resume
 * Headers: x-access-token (JWT Token) | For Testing - userid
 */
router.get('/', function (req, res, next) {
  var userid = req.headers.userid;
  if (!userid) { res.send({ success: false, message: "An error occurred in the server, Please try again" }) }
  resume.getAllResume(userid)
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
 * http://localhost:8680/api/resume
 * Headers: x-access-token (JWT Token) | For Testing - userid
 * Body: JSON(application/json)
 * {
	    "Description": ""
   }
*/
router.post('/', upload.single('file'), function (req, res, next) {
  var userid = req.headers.userid;
  var file = req.file;
  var newResume = {
    UserID: userid,
    Description: req.body.Description,
    MD5Code: file.filename,
    PathName: file.path,
    FileName: file.originalname,
  }
  resume.addResume(newResume)
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
 * http://localhost:8680/api/resume
 * Headers: x-access-token (JWT Token) | For Testing - userid
 * Body: JSON(application/json)
 * {
	    "Description": ""
   }
*/
router.put('/', function (req, res) {
  var userid = req.headers.userid;
  resume.updateAttributes(userid, req.body.Description)
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
 * http://localhost:8680/api/resume/1
 * Headers: x-access-token (JWT Token) | For Testing - userid
 * Params: resume id
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