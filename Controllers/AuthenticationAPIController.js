var express = require('express');
var router = express.Router();
var path = require('path');
//var user = require(path.resolve('./APIs/user.js')).api;
var token = require('../token.js');

module.exports = function (app, passport) {

    app.get('/', token.verifyToken, function (req, res) {
        res.send('Available');
    })

    app.post('/signup', function (req, res, next) {
        passport.authenticate('local-signup', function (err, user, msg) {
            if (!user) {
                return res.status(409).send({
                    success: false,
                    message: msg.message
                });
            }
            if (user) {
                var response = {
                    success: true,
                    message: msg.message,
                    user: user
                }
                return res.status(201).send(response);
            }
        })(req, res, next);
    });

    app.post('/signin', function (req, res, next) {
        passport.authenticate('local-signin', function (err, user, msg) {
            if (!user) {
                return res.status(401).send({
                    success: false,
                    message: msg.message
                });
            }
            if (user) {
                return res.status(201).send({
                    success: true,
                    message: msg.message,
                    accessToken: token.generateToken(user),
                    user: user
                });
            }
        })(req, res, next);
    });

    app.get('/checktoken', token.verifyToken, function (req, res) {
        res.status(200).send({
            success: true,
            message: 'Token is Valid'
        });
    })

    //app.get('/dashboard', isLoggedIn, authController.dashboard);

    // function isLoggedIn(req, res, next) {
    //     if (req.isAuthenticated())
    //         return next();
    //     res.redirect('/signin');
    // }
}
