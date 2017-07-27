var model = require("./Models");
var path = require('path');
var user = require(path.resolve('./APIs/user.js'));
var facebookConfig = require('./config').facebook;

module.exports = function (passport) {
    var User = model.User;
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookTokenStrategy = require('passport-facebook-token');

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // pass back the entire request to callback
        },
        function (req, email, password, done) {
            var data = {
                Email: email,
                Password: password,
                UserName: req.body.UserName,
                DateOfBirth: req.body.DateOfBirth,
                Address: req.body.Address,
                PostalCode: req.body.PostalCode,
                Gender: req.body.Gender,
                CountryID: req.body.CountryID,
                DeviceToken: req.body.DeviceToken
            };
            user.signup(req.get('host'), data)
                .then(function (data) {
                    return done(null, data.user, { message: data.msg });
                }).catch(function (error) {
                    return done(null, false, { message: error });
                });
        }
    ));

    passport.use('local-signin', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) {
            user.signin(email, password)
                .then(function (data) {
                    return done(null, data.user, { message: data.msg });
                }).catch(function (error) {
                    return done(null, false, { message: error });
                });
        }
    ));

    passport.use(new FacebookTokenStrategy(
        {
            clientID: facebookConfig.clientID,
            clientSecret: facebookConfig.clientSecret,
            profileFields: ['displayName', 'birthday', 'profileUrl', 'emails', 'gender']
        },
        function (accessToken, refreshToken, profile, done) {
            console.log(profile._json)
            var data = {
                Email: profile._json.email,
                UserName: profile._json.name,
                DateOfBirth: profile._json.birthday,
                Gender: profile._json.gender,
                Address: "",
                PostalCode: "",
                CountryID: 1,
                DeviceToken: ""
            };
            user.facebook(data)
                .then(function (data) {
                    return done(null, data.user, { message: data.msg });
                }).catch(function (error) {
                    return done(null, false, { message: error });
                });
        }
    ));
}