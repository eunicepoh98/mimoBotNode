var express = require('express');
var router = express.Router();
var path = require('path');
var token = require('../token.js');

module.exports = function (app, passport) {

    /**
     * Check user credentials for sign in
     * http://localhost:3000/signin
     * Body: JSON(application/json)
     * {
            "Email": "",
            "Password": ""    
        }
     */
    app.post('/facebook', function (req, res, next) {
        passport.authenticate('facebook-token', function (error, user, info) {
            res.send("yay");
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
    app.post('/signup', function (req, res, next) {
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
    app.post('/signin', function (req, res, next) {
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
    app.get('/checktoken', token.verifyToken, function (req, res) {
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
    app.post('/renewtoken', token.renewToken, function (req, res) {
        res.status(200).send({
            success: true,
            message: req.message,
            result: req.decoded
        });
    })

    //app.get('/dashboard', isLoggedIn, authController.dashboard);

    // function isLoggedIn(req, res, next) {
    //     if (req.isAuthenticated())
    //         return next();
    //     res.redirect('/signin');
    // }
}
