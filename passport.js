var models = require("./models");
module.exports = function (passport) {
    var User = models.User;
    var LocalStrategy = require('passport-local').Strategy;
    // var FacebookTokenStrategy = require('passport-facebook-token');

    // passport.serializeUser(function (user, done) {
    //     console.log("Serialize" + user.id)
    //     done(null, user.id);
    // });

    // // used to deserialize the user
    // passport.deserializeUser(function (id, done) {
    //     User.findById(id).then(function (user) {
    //         if (user) {
    //             done(null, user.get());
    //         }
    //         else {
    //             done(user.errors, null);
    //         }
    //     });
    // });

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // pass back the entire request to callback
        },
        function (req, email, password, done) {
            User.findOne({ where: { Email: email } }).then(function (user) {
                if (user) {
                    return done(null, false, { message: 'That email is already taken' });
                } else {
                    var data = {
                        Email: email,
                        Password: password
                    };
                    User.create(data).then(function (newUser) {
                        if (!newUser) {
                            return done(null, false, { message: "Something went wrong, Please try again" });
                        }
                        if (newUser) {
                            console.log(JSON.stringify(newUser))
                            return done(null, newUser, { message: "Successfully sign up" });
                        }
                    });
                }
            })
        }
    ));

    passport.use('local-signin', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) {
            var isValidPassword = function (userpass, password) {
                return (userpass == password) ? true : false;
            }
            User.findOne({ where: { email: email } }).then(function (user) {
                if (!user) {
                    return done(null, false, { message: 'Email does not exist' });
                }
                if (!isValidPassword(user.Password, password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                var userinfo = user.get();
                return done(null, userinfo, { message: 'Succuessfully signed in' });
            }).catch(function (err) {
                console.log("Error:", err);
                return done(null, false, { message: 'Something went wrong when signing in' });
            });
        }
    ));

    // passport.use(new FacebookTokenStrategy({
    //     clientID: FACEBOOK_APP_ID,
    //     clientSecret: FACEBOOK_APP_SECRET
    // }, function (accessToken, refreshToken, profile, done) {
    //     User.findOrCreate({ facebookId: profile.id }, function (error, user) {
    //         return done(error, user);
    //     });
    // }
    // ));
}