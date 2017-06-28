var jobtype = module.exports = {};
var JobType = require('../models').JobType;
var model = require('../models');

jobtype.api = {
    getAllJobType: function () {
        return new Promise((resolve, reject) => {
            JobType.findAll({})
                .then((data) => {
                    resolve(data);
                })
        })
    },
    getAllJobTypeName: function () {
        return new Promise((resolve, reject) => {
            JobType.findAll({
                attribute: ['JobType']
            })
                .then((data) => {
                    var array = []
                    data.forEach(function (name) {
                        array.push(name.JobType)
                    });
                    resolve(array);
                })
        })
    },
    getOneJobType: function (id) {
        return new Promise((resolve, reject) => {
            JobType.findById(id)
                .then((data) => {
                    resolve(data);
                })
        })
    }
}