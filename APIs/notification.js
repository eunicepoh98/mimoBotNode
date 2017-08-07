var notification = module.exports = {};
var Notification = require('../Models').Notification;
var model = require('../Models');
var path = require('path');

// Initialise Firebase Admin SDK
var admin = require("firebase-admin");
var serviceAccount = require(path.resolve('./config')).fbAdminCredentials;
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mimobot-7de57.firebaseio.com"
});

/**
 * Get all the Notification sent to user
 * @param {int} userId - User's ID
 * @returns {string} JSON format of all Notification sent to user
 */
notification.getAllNotification = function (userId) {
    return new Promise(function (resolve, reject) {
        Notification.findAll({
            where: { UserID: userId, RecordStatus: { $not: 'D' } },
            attributes: { exclude: ['RecordStatus', 'LastUpdated'] }
        }).then(function (data) {
            resolve(JSON.stringify(data));
        }).catch(function (error) {
            console.log("Error: " + error)
            reject({ msg: "An error occurred in the server, Please try again", errMsg: error.toString() });
        });
    });
}; //end of getAllNotification()

/**
 * Send Notification
 * @param {string} noty - JSON format of notification details
 * @returns {string} Success or Failure message
 */
notification.sendNotification = function (noty) {
    return new Promise(function (resolve, reject) {
        model.User.findOne({
            where: { UserID: noty.UserID }
        }).then(function (user) {
            if (user) {
                Notification.create(noty)
                    .then(function (newNoty) {
                        notification.sendToDevice(user.DeviceToken, newNoty.Title) //user.deviceToken
                            .then(function (deviceMsg) {
                                var result = { noty: newNoty, msg: deviceMsg }
                                resolve(result);
                            }).catch(function (error) {
                                reject({ msg: "An error occurred in the server, Please try again", errMsg: error.toString() });
                            });
                    }).catch(function (error) {
                        console.log("Error: " + error)
                        reject({ msg: "An error occurred in the server, Please try again", errMsg: error.toString() });
                    });
            } else {
                reject({ msg: "User not found" });
            }
        }).catch(function (error) {
            console.log("Error: " + error);
            reject({ msg: "An error occurred in the server, Please try again", errMsg: error.toString() });
        });
    });
}; //end of getAllNotification()

/**
 * Send Notification to device
 * @param {string/array} regToken - User Device Token(s)
 * @param {string} description - Notification Message
 * @returns {string} Success or Failure message
 */
notification.sendToDevice = function (regToken, description) {
    return new Promise(function (resolve, reject) {
        //message format
        var message = {
            notification: {
                title: "mimoBot",
                body: description
            }
        }
        //send the message
        admin.messaging().sendToDevice(regToken, message) //sendToTopic, sendToDeviceGroup
            .then(function (response) {
                if (response.results[0].error) {
                    resolve(response.results[0].error.message);
                } else {
                    resolve("Sucuessfully sent message");
                }
            }).catch(function (error) {
                console.log("Error sending message: ", JSON.stringify(error));
                reject({ msg: "Error sending message" });
            });
    });
}; //end of sendNotification()

