var express = require('express');
var router = express.Router();
var path = require('path');
var token = require('../token.js');

module.exports = function (app, passport) {

    /**
     * Create an account for the user
     * http://localhost:3000/signup
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
     * http://localhost:3000/
     */
    app.post('/signin', function (req, res, next) {
        passport.authenticate('local-signin', function (err, user, msg) {
            if (!user) {
                return res.status(401).send({ success: false, message: msg.message });
            }
            if (user) {
                return res.status(201).send({ success: true, message: msg.message, accessToken: token.generateToken(user), result: user });
            }
        })(req, res, next);
    });

    /**
     * Check if JWT token is valid
     * http://localhost:3000/
     */
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
