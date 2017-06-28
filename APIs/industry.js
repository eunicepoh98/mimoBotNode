var industry = module.exports = {};
var Industry = require('../models').Industry;
var model = require('../models');

industry.api = {
    getAllIndustry: function () {
        return new Promise((resolve, reject) => {
            Industry.findAll({})
                .then((data) => {
                    console.log(JSON.stringify(data));
                    resolve(data);
                })
        })
    },
    getOneIndustry: function (id) {
        return new Promise((resolve, reject) => {
            Industry.findById(id)
                .then((data) => {
                    console.log(JSON.stringify(data));
                    resolve(data);
                })
        })
    }
}