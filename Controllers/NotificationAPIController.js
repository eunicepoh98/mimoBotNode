var express = require('express');
var router = express.Router();
var path = require('path');
var notification = require(path.resolve('./APIs/notification.js'));

/* Get all Notification
 * http://localhost:3000/api/notification
 * Headers: x-access-token (JWT Token) | For Testing - userid
*/
router.get('/', function (req, res, next) {
  var userid = req.headers.userid;
  if (!userid) { res.send({ success: false, message: "Something went wrong" }) }
  notification.getAllNotification(userid)
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
 * Send Notification to one user
 * http://localhost:3000/api/notification
 * Headers: x-access-token (JWT Token) | For Testing - userid
 * Body: JSON(application/json)
 * {
	    "Title": "",
      "Description": ""
   }
 */
router.post('/', function (req, res, next) {
  var userid = req.headers.userid;
  if (!userid) { res.send({ success: false, message: "Something went wrong" }) }
  var noty = {
    Title: req.body.Title, //Subject of the Notification / body of what user will see when they receive message
    Description: req.body.Description, //Description about the notification
    UserID: userid
  }
  notification.sendNotification(noty)
    .then(function (data) {
      var response = { success: true, message: data.msg, result: data.noty };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
});

router.post('/send', function (req, res, next) {
  var regToken = req.body.deviceToken;
  var description = req.body.description;
  notification.sendToDevice(regToken, description)
    .then(function (msg) {
      var response = { success: true, message: msg };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
})

module.exports = router;