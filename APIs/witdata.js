var witdata = module.exports = {};
var path = require('path');
var request = require('request');
var witConfig = require('../config').wit;
var serverToken = witConfig.serverToken;
var jobfunction = require(path.resolve('./APIs/jobfunction.js'));
var industry = require(path.resolve('./APIs/industry.js'));
var jobtype = require(path.resolve('./APIs/jobtype.js'));

witdata.loadJobFunction = function loadJobFunction() {
    return new Promise(function (resolve, reject) {
        jobfunction.getAllJobFunctionSynonyms().then(function (data) {
            resolve(createEntity("job_function", "contains all the job function", formatData(data)));
        });
    });
}
witdata.loadJobType = function loadJobType() {
    return new Promise(function (resolve, reject) {
        jobtype.getAllJobTypeSynonyms().then(function (data) {
            resolve(createEntity("job_type", "contains all the job type", formatData(data)));
        });
    });
}
witdata.loadIndustry = function loadIndustry() {
    return new Promise(function (resolve, reject) {
        industry.getAllIndustrySynonyms().then(function (data) {
            resolve(createEntity("industry_type", "contains all the industry", formatData(data)));
        });
    });
}
function Value(value, expressions) {
    this.value = value;
    this.expressions = expressions
}
function formatData(data) {
    var array = [];
    data.forEach(function (value) {
        array.push({ value: value });
    });
    return array;
}
// function formatData(data) {
//     var array = [];
//     data.forEach(function (value) {
//         if (value.includes("/")) {
//             value.split(" / ").forEach(function (one) {
//                 array.push({ value: one })
//             })
//         } else if (value.includes("&")) {
//             value.split(" & ").forEach(function (one) {
//                 array.push({ value: one })
//             })
//         } else {
//             array.push({ value: value })
//         }
//     });
//     return array;
// }
function createEntity(entityName, description, value) {
    var entities = {
        "doc": description,
        "id": entityName,
        "values": value
    };
    var options = {
        url: "https://api.wit.ai/entities",
        method: "POST",
        body: entities,
        headers: {
            Authorization: 'Bearer ' + serverToken,
            'Content-Type': 'application/json'
        },
        json: true
    };
    //sends the request
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        return body
    });
}

witdata.loadAllData = function () {
    return new Promise(function (resolve, reject) {
        witdata.loadIndustry().then(witdata.loadJobFunction().then(witdata.loadJobType().then(resolve)));
    });
}

