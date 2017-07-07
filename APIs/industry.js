var industry = module.exports = {};
var Industry = require('../Models').Industry;
var model = require('../Models');

industry.api = {
    getAllIndustry: function () {
        return new Promise(function (resolve, reject) {
            Industry.findAll({})
                .then(function (data) {
                    //console.log(JSON.stringify(data));
                    resolve(data);
                })
        })
    },
    getAllIndustryName: function () {
        return new Promise(function (resolve, reject) {
            Industry.findAll({
                attributes: ['IndustryName']
            })
                .then(function (data) {
                    var array = []
                    data.forEach(function (name) {
                        array.push(name.IndustryName)
                    });
                    resolve(array);
                })
        })
    },
    getOneIndustry: function (id) {
        return new Promise(function (resolve, reject) {
            Industry.findById(id)
                .then(function (data) {
                    //console.log(JSON.stringify(data));
                    resolve(JSON.stringify(data));
                })
        })
    },
    addIndustry: function (industry) {
        return new Promise(function (resolve, reject) {
            console.log(industry)
            Industry.create(industry).then(function (newIndustry) {
                resolve(JSON.stringify(newIndustry))
            }).catch(function (error) {
                console.log("Error: " + error)
                reject;
            })
        })
    }
}