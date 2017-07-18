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
            user.signup(data)
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

    passport.use(new FacebookTokenStrategy(facebookConfig,
        function (accessToken, refreshToken, profile, done) {
            console.log(profile);
            //profile.displayName
            //profile.emails[0].value
            return done(null, "", { message: "" });
            // User.findOrCreate({ facebookId: profile.id }, function (error, user) {
            //     return done(error, user);
            // });
        }
    ));
}