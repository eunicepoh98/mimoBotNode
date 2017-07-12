var express = require('express');
var router = express.Router();
var path = require('path');
var notification = require(path.resolve('./APIs/notification.js'));

/* Get all Notification
 * http://localhost:3000/api/notification/1
 * Params: /id
 * id - id of the user
*/
router.get('/:id', function (req, res, next) {
  notification.getAllNotification(req.params.id)
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
 * http://localhost:3000/api/notification/1
 * Body: JSON(application/json)
 * {
	    "Title": "",
      "Description": ""
   }
 */
router.post('/:id', function (req, res, next) {
  var noty = {
    Title: req.body.Title, //Subject of the Notification / body of what user will see when they receive message
    Description: req.body.Description, //Description about the notification
    UserID: req.params.id
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

module.exports = router;