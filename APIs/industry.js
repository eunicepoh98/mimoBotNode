var industry = module.exports = {};
var Industry = require('../models').Industry;
var model = require('../models');

industry.api = {
    getAllIndustry: function () {
        return new Promise((resolve, reject) => {
            Industry.findAll({})
                .then((data) => {
                    //console.log(JSON.stringify(data));
                    resolve(data);
                })
        })
    },
    getAllIndustryName: function () {
        return new Promise((resolve, reject) => {
            Industry.findAll({
                attributes: ['IndustryName']
            })
                .then((data) => {
                    var array = []
                    data.forEach(function (name) {
                        array.push(name.IndustryName)
                    });
                    resolve(array);
                })
        })
    },
    getOneIndustry: function (id) {
        return new Promise((resolve, reject) => {
            Industry.findById(id)
                .then((data) => {
                    //console.log(JSON.stringify(data));
                    resolve(data);
                })
        })
    },
    addIndustry: function (industry) {
        return new Promise((resolve, reject) => {
            console.log(industry)
            Industry.create(industry).then(function (newIndustry) {
                resolve(newIndustry)
            }).catch(function (error) {
                console.log("Error: " + error)
            })
        })
    }
}