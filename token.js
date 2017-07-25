var jwttoken = module.exports = {};
var path = require('path');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var secretEmailKey = require(path.resolve('config.js')).others.secretEmailKey;
var secretPwdKey = require(path.resolve('config.js')).others.secretPwdKey;

/** Generate JWT token for email verification*/
jwttoken.generateEmailToken = function (email) {
    return jwt.sign({ data: email }, secretEmailKey, { expiresIn: 18000 });
}

jwttoken.verifyEmailToken = function (token) {
    return new Promise(function (resolve, reject) {
        jwt.verify(token, secretEmailKey, function (err, decoded) {
            if (err) {
                reject(err.name + "(" + err.message + ")");
            } else {
                resolve(decoded.data)
            }
        });
    });
}

/** Generate JWT token */
jwttoken.generateToken = function (user) {
    return jwt.sign({ data: user }, secretPwdKey, { expiresIn: 10800 });
}

jwttoken.verifyToken = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, secretPwdKey, function (err, decoded) {
            if (err) {
                return res.status(403).send({
                    success: false,
                    message: err.name + "(" + err.message + ")"
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.headers.userid = decoded.data.UserID;
                next();
            }
        });
    } else {  // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
}

jwttoken.renewToken = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, secretPwdKey, function (err, decoded) {
            if (err) {
                req.message = "Successfully renewed token";
                req.headers.userid = jwttoken.generateToken({ "Email": req.body.Email, "UserID": req.body.UserID })
                next();
            } else {
                req.message = "Token is still valid";
                req.headers.userid = token;
                next();
            }
        });
    } else {  // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
}
