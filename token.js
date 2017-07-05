var path = require('path');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var secretKey = require(path.resolve('config.js')).others.secretKey;

module.exports = {

    /** Generate JWT token */
    generateToken: function (user) {
        return jwt.sign({data: user}, secretKey, { expiresIn: 60 });
    },
    verifyToken: function (req, res, next) {

        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
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
                    req.decoded = decoded;
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
}
