var user = module.exports = {};
var User = require('../Models').User;
var model = require('../Models');
var token = require('../token.js');

/**
 * Create account for Facebook User
 * @param {string} user - JSON format of User's details
 * @returns {string} JSON format of user {UserID, Email, accessToken} and message || error message
 */
user.facebook = function (newuser) {
    return new Promise(function (resolve, reject) {
        User.findOne({ where: { Email: newuser.Email } })
            .then(function (gotuser) {
                if (gotuser) {
                    var userinfo = {
                        "Email": gotuser.Email,
                        "UserID": gotuser.UserID
                    }
                    var response = {
                        "Email": gotuser.Email,
                        "UserID": gotuser.UserID,
                        "accessToken": token.generateToken(userinfo)
                    }
                    resolve({ user: response, msg: 'Successfully signed in with Facebook' });
                } else {
                    User.create(newuser)
                        .then(function (newUser) {
                            if (!newUser) {
                                reject("Something went wrong, Please try again");
                            }
                            if (newUser) {
                                var userinfo = {
                                    "Email": newUser.Email,
                                    "UserID": newUser.UserID
                                }
                                var response = {
                                    "Email": newUser.Email,
                                    "UserID": newUser.UserID,
                                    "accessToken": token.generateToken(userinfo)
                                }
                                resolve({ user: response, msg: 'Successfully signed in with Facebook' });
                            }
                        }).catch(function (error) {
                            console.log("Error: " + error);
                            reject("Something went wrong, Please try again");
                        });
                }
            }).catch(function (error) {
                console.log("Error: " + error);
                reject("Something went wrong, Please try again");
            });
    });
}

/**
 * Create account for User
 * @param {string} user - JSON format of User's details
 * @returns {string} JSON format of user {UserID, Email, accessToken} and message || error message
 */
user.signup = function (newuser) {
    return new Promise(function (resolve, reject) {
        var plainpassword = newuser.Password
        newuser.Password = User.generateHash(newuser.Password)
        User.findOne({ where: { Email: newuser.Email } })
            .then(function (gotuser) {
                if (gotuser) {
                    reject('That email is already taken');
                } else {
                    User.create(newuser)
                        .then(function (newUser) {
                            if (!newUser) {
                                reject("Something went wrong, Please try again");
                            }
                            if (newUser) {
                                user.signin(newUser.Email, plainpassword)
                                    .then(function (result) {
                                        resolve({ user: result.user, msg: result.msg });
                                    }).catch(function (error) {
                                        console.log("Error: " + error);
                                        reject(error);
                                    });
                            }
                        }).catch(function (error) {
                            console.log("Error: " + error);
                            reject("Something went wrong, Please try again");
                        });
                }
            }).catch(function (error) {
                console.log("Error: " + error);
                reject("Something went wrong, Please try again");
            });
    });
}

/**
 * Check User's Credentials against the database
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {string} JSON format of user {UserID, Email, accessToken} and message || error message
 */
user.signin = function (email, password) {
    return new Promise(function (resolve, reject) {
        User.findOne({ where: { Email: email } })
            .then(function (user) {
                console.log("user " + JSON.stringify(user));

                if (!user) {
                    reject('Email does not exist');
                }
                if (!user.validPassword(password)) {
                    reject('Incorrect password.');
                }
                var userinfo = {
                    "Email": user.Email,
                    "UserID": user.UserID
                }
                var response = {
                    "Email": user.Email,
                    "UserID": user.UserID,
                    "accessToken": token.generateToken(userinfo)
                }
                resolve({ user: response, msg: 'Successfully signed in' });
            }).catch(function (err) {
                console.log("Error:", err);
                reject('Something went wrong when signing in')
            });
    });
}

/**
 * Get the information of one User based on the ID from the database
 * @param {int} id - User's ID
 * @returns {string} JSON format of the User details
 */
user.getOneUser = function (id) {
    return new Promise(function (resolve, reject) {
        User.findOne({
            where: { UserID: id },
            attributes: { exclude: ['RecordStatus', 'LastUpdated', 'CountryID', 'Password'] },
            include: [{ model: model.Country, attributes: ['CountryName'] }]
        }).then(function (data) {
            resolve(JSON.stringify(data));
        }).catch(function (error) {
            console.log("Error: " + error);
            reject(error.toString());
        });
    });
} //end of getOneUser()

/**
 * Update User information into the database
 * @param {int} id - UserID to update
 * @param {string} user - JSON format of updated user details
 * @returns {string} JSON format of updated user information
 */
user.updateAttributes = function (id, user) {
    return new Promise(function (resolve, reject) {
        User.find({ where: { UserID: id } })
            .then(function (gotuser) {
                if (gotuser) {
                    user["Password"] = User.generateHash(user["Password"]);
                    user["LastUpdated"] = '';
                    gotuser.update(user)
                        .then(function (update) {
                            resolve({ data: JSON.stringify(update), msg: 'Successfully updated user details' })
                        }).catch(function (error) {
                            console.log("Error: " + error)
                            reject(error.toString());
                        });
                } else {
                    reject("User not found");
                }
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    });
}; //end of updatAttributes()

/**
 * Update the User's Device Token
 * @param {int} userId - User's ID
 * @param {string} deviceToken - user's deviceToken
 */
user.updateDeviceToken = function (userId, deviceToken) {
    return new Promise(function (resolve, reject) {
        User.find({ where: { UserID: userId } })
            .then(function (user) {
                if (user) {
                    user.update({ DeviceToken: deviceToken, LastUpdated: '' }, { fields: ['DeviceToken', 'LastUpdated'] })
                        .then(function (update) {
                            resolve({ data: JSON.stringify(update), msg: 'Successfully updated user devicetoken' })
                        }).catch(function (error) {
                            console.log("Error: " + error)
                            reject(error.toString());
                        });
                } else {
                    reject("User not found");
                }
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    });
};// end of updateDeviceToken()