var user = module.exports = {};
var User = require('../Models').User;
var model = require('../Models');
var token = require('../token.js');
var email = require('../email.js');

/**
 * Check if email exist in database, and send email
 * @param {string} host - Host address
 * @param {string} useremail - User's email
 * @returns {string} message
 */
user.checkEmail = function (host, useremail) {
    return new Promise(function (resolve, reject) {
        User.findOne({ where: { Email: useremail } })
            .then(function (gotuser) {
                if (gotuser) {
                    if (gotuser.Verified) {
                        reject("Your email account is already verified");
                    } else {
                        email.sendVerificationEmail(host, useremail)
                            .then(function (result) {
                                resolve(result);
                            }).catch(function (error) {
                                reject(error);
                            });
                    }
                } else {
                    reject("Sorry, you don't seem to have an account registered under that email");
                }
            }).catch(function (error) {
                console.log("Error: " + error);
                reject(error.toString());
            });
    });
} //end of checkEmail()

/**
 * Check if email and UserID exist, used for renew jwt token
 * @param {string} usermail - User's email
 * @param {string} userid - User's email
 */
user.checkUserIDEmail = function (useremail, userid) {
    return new Promise(function (resolve, reject) {
        User.findOne({ where: { Email: useremail } })
            .then(function (gotuser) {
                if (gotuser) {
                    if (gotuser.UserID == userid) { resolve(); }
                    reject();
                } else { reject(); }
            }).catch(function (error) {
                console.log("Error: " + error);
                reject(error.toString());
            });
    });
} //end of checkUserIDEmail()

/**
 * Check if email and UserID exist, used for renew jwt token
 * @param {string} usermail - User's email
 * @param {string} userid - User's email
 */
user.changePassword = function (userid, oldpassword, newpassword) {
    return new Promise(function (resolve, reject) {
        User.findOne({ where: { UserID: userid } })
            .then(function (gotuser) {
                if (gotuser) {
                    if (gotuser.validPassword(oldpassword)) {
                        // update password
                        gotuser.update({ Password: User.generateHash(newpassword), LastUpdated: '' }, { fields: ['Password', 'LastUpdated'] })
                            .then(function (update) {
                                resolve('Password Updated')
                            }).catch(function (error) {
                                console.log("Error: " + error)
                                reject("Unable to change password");
                            });
                    } else {
                        reject("Incorrect password");
                    }
                } else { reject("User not found"); }
            }).catch(function (error) {
                console.log("Error: " + error);
                reject("Unable to change password");
            });
    });
} //end of checkUserIDEmail()

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
                                reject("An error occurred in the server, Please try again");
                            }
                            if (newUser) { //doesn't return UserID
                                User.findOne({ where: { Email: newUser.Email } }) // get new user information
                                    .then(function (newuser) {
                                        var userinfo = {
                                            "Email": newuser.Email,
                                            "UserID": newuser.UserID
                                        }
                                        var response = {
                                            "Email": newuser.Email,
                                            "UserID": newuser.UserID,
                                            "accessToken": token.generateToken(userinfo)
                                        }
                                        user.updateVerificationStatus(newuser.Email).then(function () {
                                            resolve({ user: response, msg: 'Successfully signed in with Facebook' });
                                        });
                                    })
                            }
                        }).catch(function (error) {
                            console.log("Error: " + error);
                            reject("An error occurred in the server, Please try again");
                        });
                }
            }).catch(function (error) {
                console.log("Error: " + error);
                reject("An error occurred in the server, Please try again");
            });
    });
}

/**
 * Create account for User
 * @param {string} user - JSON format of User's details
 * @returns {string} JSON format of user {UserID, Email, accessToken} and message || error message
 */
user.signup = function (host, newuser) {
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
                                reject("An error occurred in the server, Please try again");
                            }
                            if (newUser) {
                                //Send email to user for verification
                                email.sendVerificationEmail(host, newUser.Email)
                                    .then(function (result) {
                                        resolve({ user: newUser, msg: 'Successfully signed up. An email have been sent to you. Please verify before logging in.' });
                                    }).catch(function (error) {
                                        reject(error);
                                    });
                            }
                        }).catch(function (error) {
                            console.log("Error: " + error);
                            reject("An error occurred in the server, Please try again");
                        });
                }
            }).catch(function (error) {
                console.log("Error: " + error);
                reject("An error occurred in the server, Please try again");
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
            .then(function (gotuser) {
                if (!gotuser) {
                    reject('Email does not exist');
                }
                if (!gotuser.validPassword(password)) {
                    reject('Incorrect password.');
                }
                if (!gotuser.Verified) {
                    reject("You have not verified your email account");
                }
                var userinfo = {
                    "Email": gotuser.Email,
                    "UserID": gotuser.UserID
                }
                var response = {
                    "Email": gotuser.Email,
                    "UserID": gotuser.UserID,
                    "accessToken": token.generateToken(userinfo)
                }
                resolve({ user: response, msg: 'Successfully signed in' });
            }).catch(function (err) {
                console.log("Error:", err);
                reject('An error occurred in the server when signing in')
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
            attributes: { exclude: ['RecordStatus', 'LastUpdated', 'Password'] },
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

/**
 * Update the User's Verification Status
 * @param {string} email - User's Email
 */
user.updateVerificationStatus = function (email) {
    return new Promise(function (resolve, reject) {
        User.find({ where: { Email: email } })
            .then(function (user) {
                if (user) {
                    user.update({ Verified: true, LastUpdated: '' }, { fields: ['Verified', 'LastUpdated'] })
                        .then(function (update) {
                            resolve("<h2>Your email " + email + " has been successfully verified</h2>")
                        }).catch(function (error) {
                            console.log("Error: " + error)
                            reject();
                        });
                } else {
                    reject("User not found");
                }
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    });
};// end of updateVerificationStatus()

/**
 * Update the User's profile URL
 * @param {int} userId - User's ID
 * @param {string} url - user's deviceToken
 */
user.updateProfilePicture = function (userId, url) {
    return new Promise(function (resolve, reject) {
        User.find({ where: { UserID: userId } })
            .then(function (user) {
                if (user) {
                    user.update({ Picture: url, LastUpdated: '' }, { fields: ['Picture', 'LastUpdated'] })
                        .then(function (update) {
                            resolve({ data: JSON.stringify(update), msg: 'Successfully updated profile picture' })
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
};// end of updateProfilePicture()