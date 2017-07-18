var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var token = require('../token.js');

router.get('/', function (req, res) {
    res.send('Available')
})

/**
 * Check user credentials for sign in
 * http://localhost:3000/facebook
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
 * http://localhost:3000/signup
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
 * http://localhost:3000/signin
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
 * http://localhost:3000/checktoken
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
 * http://localhost:3000/renewtoken
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
        result: req.decoded
    });
});

module.exports = router;
