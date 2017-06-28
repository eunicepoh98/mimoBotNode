var jobfunction = module.exports = {};
var JobFunction = require('../models').JobFunction;
var model = require('../models');

jobfunction.api = {
    getAllJobFunction: function () {
        return new Promise((resolve, reject) => {
            JobFunction.findAll({})
                .then((data) => {
                    resolve(data);
                })
        })
    },
    getAllJobFunctionName: function () {
        return new Promise((resolve, reject) => {
            JobFunction.findAll({
                attributes: ['JobFunctionName']
            })
                .then((data) => {
                   var array = []
                    data.forEach(function (name) {
                        array.push(name.JobFunctionName)
                    });
                    resolve(array);
                })
        })
    },
    getOneJobFunction: function (id) {
        return new Promise((resolve, reject) => {
            JobFunction.findById(id)
                .then((data) => {
                    resolve(data);
                })
        })
    }
}