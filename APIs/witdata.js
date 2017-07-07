var witdata = module.exports = {};
var path = require('path');
var request = require('request');
var witConfig = require('../config').wit;
var serverToken = witConfig.serverToken;
var jobfunction = require(path.resolve('./APIs/jobfunction.js')).api;
var industry = require(path.resolve('./APIs/industry.js')).api;
var jobtype = require(path.resolve('./APIs/jobtype.js')).api;

witdata.api = {

    loadJobType: function () {
        return new Promise(function (resolve, reject) {
            jobfunction.getAllJobFunctionName().then(function (data) {
                resolve(createEntity("job_type", "contains all the job type", formatData(data)));
            })

        })
    },

    loadJobFunction: function () {
        return new Promise(function (resolve, reject) {
            jobtype.getAllJobTypeName().then(function (data) {
                resolve(createEntity("job_function", "contains all the job function", formatData(data)));
            })

        })
    },

    loadIndustry: function () {
        return new Promise(function (resolve, reject) {
            industry.getAllIndustryName().then(function (data) {
                resolve(createEntity("industry_type", "contains all the industry", formatData(data)));
            })

        })
    },

    loadAllData: function () {
        return new Promise(function (resolve, reject) {
            loadIndustry().then(loadJobFunction().then(loadJobType().then(resolve)))
            // createEntity("job_type", "contains all the job type", formatData(jobTypeData));
            // createEntity("job_function", "contains all the job function", formatData(jobFunctionData));
            // createEntity("industry_type", "contains all the industry", formatData(industryData));
            // resolve;
        })
    }
}

function Value(value, expressions) {
    this.value = value;
    this.expressions = expressions
}

function formatData(data) {
    var array = [];
    data.forEach(function (value) {
        if (value.includes("/")) {
            value.split(" / ").forEach(function (one) {
                array.push({ value: one })
            })
        } else if (value.includes("&")) {
            value.split(" & ").forEach(function (one) {
                array.push({ value: one })
            })
        } else {
            array.push({ value: value })
        }
    });
    return array;
}

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
        //resolve(body);
        return body
    });
}

var jobTypeData = ["Full Time", "Part Time", "Contract"];

var industryData = [
    'Aerospace / Aviation',
    'Agriculture / Forestry / Fishing',
    'Athletics / Sports',
    'Arts & Culture',
    'Automotive',
    'Banking / Financial Services / Insurance',
    'Broadcast / Media / Entertainment',
    'Charities / Social Services / NGOs',
    'Clothing / Garment / Textile',
    'Conglomerate / Diversified Companies',
    'Construction / Building Services / Real Estate',
    'Education / Training Institutes',
    'Energy / Power / Environmental',
    'Executive Search & Recruitment Agencies',
    'Fast Moving Consumer Goods',
    'Human Resources Management / Consultancy'
];

var jobFunctionData = [
    'Administrator / Office Manager',
    'Architect / Interior Design / Builder',
    'Banking, Financial Services & Insurance',
    'Customer Service & Contact Centre',
    'Designer',
    'Educator / Trainer',
    'Finance & Accounting',
    'Healthcare & Wellness',
    'Human Resources',
    'IT - Hardware',
    'IT - Software',
    'Legal & Compliance',
    'Manufacturing / Production / Engineering',
    'Marketing, Public Relations & Communications',
    'Media & Entertainment',
    'Professionals',
    'Research & Development',
    'Sales & Business Development',
    'Supply Chain, Procurement & Logistics',
    'Telecom / Service Provider',
    'Headhunter & Recruiter'
];

//old format data
// function formatData(data) {
//     var array = [];
//     data.forEach(function (value) {
//         if (value.includes("-")) {
//             var syn = value.split(" - ");
//             array.push(new Value(value, syn));
//         } else if (value.includes("/")) {
//             var syn = []
//             var slash = value.split(" / ");
//             slash.forEach((one) => {
//                 if (one.includes("&")) {
//                     var and = one.split(" & ");
//                     and.forEach((a) => { syn.push(a); })
//                 } else { syn.push(one); }
//             })
//             array.push(new Value(value, syn));
//         } else if (value.includes("&")) {
//             var syn = []
//             var slash = value.split(" & ");
//             slash.forEach((one) => {
//                 if (one.includes("/")) {
//                     var and = one.split(" / ");
//                     and.forEach((a) => { syn.push(a); })
//                 } else { syn.push(one); }
//             })
//             array.push(new Value(value, syn));
//         } else if (value.includes(",")) {
//             var syn = []
//             var slash = value.split(", ");
//             slash.forEach((one) => {
//                 if (one.includes("&")) {
//                     var and = one.split(" & ");
//                     and.forEach((a) => { syn.push(a); })
//                 } else { syn.push(one); }
//             })
//             array.push(new Value(value, syn));
//         } else { array.push(new Value(value, [])); }
//     });
//     return (array);
// }

