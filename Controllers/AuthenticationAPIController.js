var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var token = require('../token.js');
var email = require('../email.js');
var user = require(path.resolve('./APIs/user.js'));

router.get('/', function (req, res) {
    res.send('Available')
})

/**
 * [POST]
 * Resend confirmation email to user's email
 * http://localhost:8680/resendemail
 * Body: JSON(application/json)
 * {
        "email": ""   
    }
 */
router.post('/resendemail', function (req, res) {
    user.checkEmail(req.get('host'), req.body.email)
        .then(function (result) {
            res.send({ success: true, message: result });
        }).catch(function (error) {
            res.send({ success: false, message: error });
        });
});

/**
 * [GET]
 * URL that user receive in their email to verify their email address
 * http://localhost:8680/verifyemail?token=
 */
router.get('/verifyemail?', function (req, res) {
    var token = req.query.token;
    email.verifyEmail(token)
        .then(function (result) {
            res.send(result);
        }).catch(function (error) {
            res.send(error);
        });
});

/**
 * Check user credentials for sign in
 * http://localhost:8680/facebook
 * Body: JSON(application/json)
 * {
        "access_token": ""   
    }
 */
router.post('/facebook', function (req, res, next) {
    passport.authenticate('facebook-token', function (error, user, msg) {
        if (error) {
            return res.send({ success: false, message: error.message });
        }
        if (!user) {
            return res.status(409).send({ success: false, message: msg.message });
        }
        if (user) {
            var response = { success: true, message: msg.message, result: user }
            return res.status(201).send(response);
        }
    })(req, res, next);
});

/**
 * Create an account for the user
 * http://localhost:8680/signup
 * Body: JSON(application/json)
 * {
        "email": "",
        "password": "",
        "UserName": "",
        "DateOfBirth": "",
        "Address": "",
        "PostalCode": "",
        "Gender": "",
        "CountryID": ,
        "DeviceToken": ""
    }
 */
router.post('/signup', function (req, res, next) {
    passport.authenticate('local-signup', function (err, user, msg) {
        if (!user) {
            return res.status(409).send({ success: false, message: msg.message });
        }
        if (user) {
            var response = { success: true, message: msg.message, result: user }
            return res.status(201).send(response);
        }
    })(req, res, next);
});

/**
 * Check user credentials for sign in
 * http://localhost:8680/signin
 * Body: JSON(application/json)
 * {
        "Email": "",
        "Password": ""    
    }
 */
router.post('/signin', function (req, res, next) {
    passport.authenticate('local-signin', function (err, user, msg) {
        if (!user) {
            return res.status(401).send({ success: false, message: msg.message });
        }
        if (user) {
            return res.status(201).send({ success: true, message: msg.message, result: user });
        }
    })(req, res, next);
});

/**
 * Check if JWT token is valid
 * http://localhost:8680/checktoken
 */
router.get('/checktoken', token.verifyToken, function (req, res) {
    //console.log(req.decoded)
    res.status(200).send({
        success: true,
        message: 'Token is Valid'
    });
})

/**
 * Renew JWT token
 * http://localhost:8680/renewtoken
 * Body: JSON(application/json)
 * {
        "Email": 1,
        "UserID": 1      
    }
 */
router.post('/renewtoken', token.renewToken, function (req, res) {
    res.status(200).send({
        success: true,
        message: req.message,
        result: req.headers.userid
    });
});

module.exports = router;
