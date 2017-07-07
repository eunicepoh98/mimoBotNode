var jobfunction = module.exports = {};
var JobFunction = require('../Models').JobFunction;
var model = require('../Models');

jobfunction.api = {
    getAllJobFunction: function () {
        return new Promise(function (resolve, reject) {
            JobFunction.findAll({})
                .then(function (data) {
                    resolve(data);
                })
        })
    },
    getAllJobFunctionName: function () {
        return new Promise(function (resolve, reject) {
            JobFunction.findAll({
                attributes: ['JobFunctionName']
            })
                .then(function (data) {
                    var array = []
                    data.forEach(function (name) {
                        array.push(name.JobFunctionName)
                    });
                    resolve(array);
                })
        })
    },
    getOneJobFunction: function (id) {
        return new Promise(function (resolve, reject) {
            JobFunction.findById(id)
                .then(function (data) {
                    resolve(data);
                })
        })
    },
    addJobFunction: function (jobFunction) {
        return new Promise(function (resolve, reject) {
            JobFunction.create(jobFunction).then(function (newJobFunction) {
                resolve(JSON.stringify(newJobFunction))
            }).catch(function (error) {
                console.log("Error: " + error)
                reject;
            })
        })
    }
}