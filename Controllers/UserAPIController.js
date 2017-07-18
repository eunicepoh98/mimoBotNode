var express = require('express');
var router = express.Router();
var path = require('path');
var user = require(path.resolve('./APIs/user.js'));

/** 
 * [GET]
 * Get User Details by UserID
 * http://localhost:3000/api/user/
 * Headers: userid
*/
router.get('/', function (req, res, next) {
  var userid = req.headers.userid; //req.decoded;
  user.getOneUser(userid)
    .then(function (data) {
      var response = { success: true, result: JSON.parse(data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
});

/**
 * [PUT]
 * Update User
 * http://localhost:3000/api/user
 * Headers: userid
 * Body: JSON(application/json)
 * {
      "email": "",
      "password": "",
      "UserName": "",
      "DateOfBirth": "",
      "Address": "",
      "PostalCode": "",
      "Gender": "",
      "CountryID": 1
    }
 */
router.put('/', function (req, res) {
  var userid = req.headers.userid; //req.decoded;
  var update = {
    Email: req.body.email,
    Password: req.body.password,
    UserName: req.body.UserName,
    DateOfBirth: req.body.DateOfBirth,
    Address: req.body.Address,
    PostalCode: req.body.PostalCode,
    Gender: req.body.Gender,
    CountryID: req.body.CountryID
  }
  user.updateAttributes(userid, update)
    .then(function (data) {
      var response = { success: true, message: data.msg, result: JSON.parse(data.data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
});

/**
 * [PUT]
 * Update User Device Token
 * http://localhost:3000/api/user/devicetoken
 * Headers: userid
 * Body: JSON(application/json)
 * {
      "DeviceToken": ""
   }
 */
router.put('/devicetoken', function (req, res) {
  var userid = req.headers.userid; //req.decoded;
  var devicetoken = req.body.DeviceToken;
  user.updateAttributes(userid, devicetoken)
    .then(function (data) {
      var response = { success: true, message: data.msg, result: JSON.parse(data.data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
});

module.exports = router;
