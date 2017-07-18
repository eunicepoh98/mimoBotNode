var jwttoken = module.exports = {};
var path = require('path');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var secretKey = require(path.resolve('config.js')).others.secretKey;

/** Generate JWT token */
jwttoken.generateToken = function (user) {
    console.log(user);
    return jwt.sign({ data: user }, secretKey, { expiresIn: 60 });
}

jwttoken.verifyToken = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, secretKey, function (err, decoded) {
            if (err) {
                return res.status(403).send({
                    success: false,
                    message: err.name + "(" + err.message + ")"
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded.data.UserID;
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
        jwt.verify(token, secretKey, function (err, decoded) {
            if (err) {
                req.message = "Successfully renewed token";
                req.decoded = jwttoken.generateToken({ "Email": req.body.Email, "UserID": req.body.UserID })
                next();
            } else {
                req.message = "Token is still valid";
                req.decoded = token;
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
