var express = require('express');
var router = express.Router();
var path = require('path');
var wit = require(path.resolve('./APIs/wit.js'));
var witdata = require(path.resolve('./APIs/witdata.js'));

/* Test Wit Controller
 * http://localhost:3000/api/wit
*/
router.get('/', function (req, res, next) {
    res.send("Available");
});

/** 
 * Process Nature Language
 * http://localhost:3000/api/wit
 * Body: JSON(application/json)
 * {
        "userMsg": "",
        "id": "1234",
        "context": {}
    }
*/
router.post('/', function (req, res, next) {
    var userMsg = req.body.userMsg;
    var sessionId = req.body.id;
    var context = req.body.context;
    wit.NLP(sessionId, userMsg, context)
        .then(function (result) {
            res.send(result);
        }).catch(function (result) {
            var response = { success: false, message: error };
            res.send(response);
        });
});

/* Populate Some Data into Wit 
 * http://localhost:3000/api/wit/data
*/
router.get('/data', function (req, res, next) {
    witdata.loadAllData()
        .then(function () {
            res.send("Data loaded into wit!")
        })
});

router.get('/test', function (req, res, next) {
    wit.test().then(function (result) {
        res.send(result)
    })
});

module.exports = router;
