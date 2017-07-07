var jobtype = module.exports = {};
var JobType = require('../Models').JobType;
var model = require('../Models');

jobtype.api = {
    getAllJobType: function () {
        return new Promise(function (resolve, reject) {
            JobType.findAll({})
                .then(function (data) {
                    resolve(data);
                })
        })
    },
    getAllJobTypeName: function () {
        return new Promise(function (resolve, reject) {
            JobType.findAll({
                attribute: ['JobType']
            })
                .then(function (data) {
                    var array = []
                    data.forEach(function (name) {
                        array.push(name.JobType)
                    });
                    resolve(array);
                })
        })
    },
    getOneJobType: function (id) {
        return new Promise(function (resolve, reject) {
            JobType.findById(id)
                .then(function (data) {
                    resolve(data);
                })
        })
    },
    addJobType: function (jobtype) {
        return new Promise(function (resolve, reject) {
            JobType.create(jobtype).then(function (newJobType) {
                resolve(JSON.stringify(newJobType))
            }).catch(function (error) {
                console.log("Error: " + error)
                reject;
            })
        })
    }
}