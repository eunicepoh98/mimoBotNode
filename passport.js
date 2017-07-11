var model = require("./Models");
module.exports = function (passport) {
    var User = model.User;
    var LocalStrategy = require('passport-local').Strategy;

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // pass back the entire request to callback
        },
        function (req, email, password, done) {
            User.findOne({ where: { Email: email } })
                .then(function (user) {
                    if (user) {
                        return done(null, false, { message: 'That email is already taken' });
                    } else {
                        var data = {
                            Email: email,
                            Password: User.generateHash(password),
                            UserName: req.body.UserName,
                            DateOfBirth: req.body.DateOfBirth,
                            Address: req.body.Address,
                            PostalCode: req.body.PostalCode,
                            Gender: req.body.Gender,
                            CountryID: req.body.CountryID
                        };
                        User.create(data)
                            .then(function (newUser) {
                                if (!newUser) {
                                    return done(null, false, { message: "Something went wrong, Please try again" });
                                }
                                if (newUser) {
                                    return done(null, newUser, { message: "Successfully sign up" });
                                }
                            }).catch(function (error) {
                                console.log("Error: " + error);
                                return done(null, false, { message: "Something went wrong, Please try again" });
                            });
                    }
                }).catch(function (error) {
                    console.log("Error: " + error);
                    return done(null, false, { message: "Something went wrong, Please try again" });
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
            User.findOne({ where: { email: email }, include: [{ model: model.Country, attributes: ['CountryName'] }] })
                .then(function (user) {
                    if (!user) {
                        return done(null, false, { message: 'Email does not exist' });
                    }
                    if (!user.validPassword(password)) {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                    var userinfo = user.get();
                    delete userinfo.Password;
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