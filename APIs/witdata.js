var witdata = module.exports = {};
var path = require('path');
var request = require('request');
var witConfig = require('../config').wit;
var serverToken = witConfig.serverToken;

witdata.api = {

    loadJobType: function () {
        return new Promise((resolve, reject) => {
            resolve(createEntity("job_type", "contains all the job type", formatData(jobTypeData)));
        })
    },

    loadJobFunction: function () {
        return new Promise((resolve, reject) => {
            resolve(createEntity("job_function", "contains all the job function", formatData(jobFunctionData)));
        })
    },

    loadIndustry: function () {
        return new Promise((resolve, reject) => {
            resolve(createEntity("industry_type", "contains all the industry", formatData(industryData)));
        })
    },

    loadAllData: function(){
        return new Promise((resolve, reject) => {
            createEntity("job_type", "contains all the job type", formatData(jobTypeData))
            createEntity("job_function", "contains all the job function", formatData(jobFunctionData));
            createEntity("industry_type", "contains all the industry", formatData(industryData));
            resolve;
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
            array.push(value.split(" / "));
        } else if (value.includes("&")) {
            array.push(value.split(" & "));
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

