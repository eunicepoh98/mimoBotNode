var express = require('express');
var router = express.Router();
var path = require('path');
var wit = require(path.resolve('./APIs/wit.js')).api;
var witdata = require(path.resolve('./APIs/witdata.js')).api;

/* Test Wit Controller
 * http://localhost:3000/api/wit
*/
router.get('/', function (req, res, next) {
    res.send("Available");
});

/* Process Nature Language
 * http://localhost:3000/api/wit
*/
router.post('/', function (req, res, next) {
    var userMsg = req.body.userMsg;
    var sessionId = req.body.id;
    var context = req.body.context;
    wit.NLP(sessionId, userMsg, context)
        .then(function (result) {
            res.send(result);
        }).catch(function (result) {
            res.end(result)
        })
});

/* Populate Some Data into Wit 
 * http://localhost:3000/api/wit/data
*/
router.get('/data', function (req, res, next) {
    witdata.loadAllData()
    .then(function(){
        res.send("Data loaded into wit!")
    })
});

module.exports = router;
