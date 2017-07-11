var express = require('express');
var router = express.Router();
var path = require('path');
var user = require(path.resolve('./APIs/user.js'));

/** 
 * Get One User by Id
 * http://localhost:3000/api/user/1
 * Params: /id
 * id - id of the user
*/
router.get('/:id', function (req, res, next) {
  user.getOneUser(req.params.id)
    .then(function (data) {
      var response = { success: true, result: JSON.parse(data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
});

/** 
 * Update User
 * http://localhost:3000/api/user/update/1
 * Params: /id
 * id - id of the user
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
router.put('/update/:id', function (req, res) {
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
  user.updateAttributes(req.params.id, update)
    .then(function (data) {
      var response = { success: true, result: JSON.parse(data) };
      res.status(200).send(response);
    }).catch(function (error) {
      var response = { success: false, message: error };
      res.send(response);
    });
});

/**
 * Delete User
 * http://localhost:3000/api/user/1
 */
router.delete('/user/:id', function (req, res) {
  models.User.destroy({
    where: { id: req.params.id },
    paranoid: true // query and loads the soft deleted records
  }).then(function (data) {
    var response = { success: true, result: JSON.parse(data) };
    res.status(200).send(response);
  }).catch(function (error) {
    var response = { success: false, message: error };
    res.send(response);
  });
});

module.exports = router;

// /* Add User
//  * http://localhost:3000/api/user
//  * {
// 	    "UserName": "",
//       "Email": "",
//       "DateOfBirth": "",
//       "Address": "",
//       "Gender": "",
//       "Password": ""
//    }
// */
// router.post('/', function (req, res, next) {
//   var u = {
//     UserName: req.body.UserName,
//     Email: req.body.Email,
//     DateOfBirth: req.body.DateOfBirth,
//     Address: req.body.Address,
//     Gender: req.body.Gender,
//     Password: req.body.Password
//   };
//   user.addUser(u).then(function (result) {
//     res.send(result)
//   })
// });    
