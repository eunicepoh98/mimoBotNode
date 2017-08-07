var email = module.exports = {};
var path = require('path');
var gmailConfig = require(path.resolve('config.js')).gmail;
var nodemailer = require('nodemailer');
var token = require('./token.js');
var user = require(path.resolve('./APIs/user.js'));

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: gmailConfig.email,
        pass: gmailConfig.password
    }
});

email.sendVerificationEmail = function (host, email) {
    return new Promise(function (resolve, reject) {
        var emailToken = token.generateEmailToken(email);
        link = "http://" + host + "/verifyemail?token=" + emailToken + "&email=" + email;

        let mailOptions = {
            to: email,
            subject: 'mimoTREE: Please verify your Email account', // Subject line
            html: 'Hi ' + email + ',<br><br>' +
            '<p>Please Click on the link below to verify your email.<br>' +
            '<a href=' + link + '>Verify Email</a></p><br><br>' +
            'Best Regards,<br><br>' +
            '<b><span style="color:rgb(0,176,80)">mimo</span></b>' +
            '<b><span style="color:rgb(128,96,0)">TREE&nbsp;</span></b>' +
            '<b><span>Pte Ltd</span></b><br>' +
            '18 Howard Road #09-04<br>' +
            'Novelty BizCentre Singapore 369585'
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                reject(error.toString())
            }
            resolve("Successfully sent email");
        });
    });
}

email.verifyEmail = function (host, emailtoken, email) {
    return new Promise(function (resolve, reject) {
        token.verifyEmailToken(emailtoken)
            .then(function (result) {
                console.log(result)
                user.updateVerificationStatus(result)
                    .then(function (resultt) {
                        resolve(resultt);
                    }).catch(function (error) {
                        console.log(error)
                        user.checkEmail(host, email)
                            .then(function (result) {
                                reject("Failed to verify account, the verification email has expired. Another email has been sent to you.");
                            }).catch(function (error) {
                                reject(error.msg)
                            });
                    })
            }).catch(function (error) {
                console.log(error)
                user.checkEmail(host, email)
                    .then(function (result) {
                        reject("Failed to verify account, the verification email has expired. Another email has been sent to you.");
                    }).catch(function (error) {
                        reject(error.msg)
                    });
            })
    });
}