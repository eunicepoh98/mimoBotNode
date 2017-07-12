var express = require('express');
var router = express.Router();
var path = require('path');
var bookmark = require(path.resolve('./APIs/bookmark.js'));

/**
 * [GET]
 * Get all User Bookmarks
 * http://localhost:3000/api/bookmark/1
 * Params: /id
 * id - user id
 */
router.get('/:id', function (req, res, next) {
  bookmark.getAllBookmark(req.params.id)
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
 * Body: JSON(application/json)
 * {
      "JobID": 1,
      "UserID": 1    
   }
*/
router.post('/', function (req, res, next) {
  var newbookmark = {
    JobID: req.body.JobID,
    UserID: req.body.UserID
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
 * Body: JSON(application/json)
 * {
      "JobID": 1,
      "UserID": 1    
   }
 */
router.put('/', function (req, res) {
  bookmark.removeBookmark(req.body.JobID, req.body.UserID)
    .then(function (data) {
      var response = { success: true, message: 'Job removed from Bookmark', result: JSON.parse(data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
});

module.exports = router;