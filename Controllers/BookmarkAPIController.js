var express = require('express');
var router = express.Router();
var path = require('path');
var bookmark = require(path.resolve('./APIs/bookmark.js'));

/**
 * [GET]
 * Get all User Bookmarks
 * http://localhost:3000/api/bookmark
 * Headers: x-access-token (JWT Token) | For Testing - userid
 */
router.get('/', function (req, res, next) {
  var userid = req.headers.userid;
  if (!userid) { res.send({ success: false, message: "Something went wrong" }) }
  bookmark.getAllBookmark(userid)
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
 * Add User Bookmark
 * http://localhost:3000/api/bookmark
 * Headers: x-access-token (JWT Token) | For Testing - userid
 * Body: JSON(application/json)
 * {
      "JobID": 1   
   }
*/
router.post('/', function (req, res, next) {
  var userid = req.headers.userid;
  if (!userid) { res.send({ success: false, message: "Something went wrong" }) }
  var newbookmark = {
    JobID: req.body.JobID,
    UserID: userid
  };
  bookmark.addBookmark(newbookmark)
    .then(function (data) {
      var response = { success: true, message: 'Job Bookmarked!', result: JSON.parse(data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
});

/**
 * [PUT]
 * Remove Bookmark
 * http://localhost:3000/api/bookmark
 * Headers: x-access-token (JWT Token) | For Testing - userid
 * Body: JSON(application/json)
 * {
      "JobID": 1   
   }
 */
router.put('/', function (req, res) {
  var userid = req.headers.userid;
  if (!userid) { res.send({ success: false, message: "Something went wrong" }) }
  bookmark.removeBookmark(req.body.JobID, userid)
    .then(function (data) {
      var response = { success: true, message: 'Job removed from Bookmark', result: JSON.parse(data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
});

module.exports = router;