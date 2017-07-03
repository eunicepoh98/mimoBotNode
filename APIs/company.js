var company = module.exports = {};
var Company = require('../models').Company;
var model = require('../models');

company.api = {
    getAllCompany: function () {
        return new Promise((resolve, reject) => {
            Company.findAll({})
                .then((data) => {
                    console.log(data);
                    res.send(JSON.stringify(data));
                })
        })
    },
    getAllCompanyName: function () {
        return new Promise((resolve, reject) => {
            Company.findAll({
                attributes: ['CompanyName']
            })
                .then((data) => {
                    var array = []
                    data.forEach(function (name) {
                        array.push(name.CompanyName)
                    });
                    resolve(array);
                })
        })
    },
    getOneCompany: function (id) {
        return new Promise((resolve, reject) => {
            Company.findById(id)
                .then((data) => {
                    resolve(JSON.stringify(data));
                })
        })
    },
    addCompany: function (company) {
        return new Promise((resolve, reject) => {
            Company.create(company).then(function (newCompany) {
                resolve(JSON.stringify(newCompany))
            }).catch(function (error) {
                console.log("Error: " + error)
                reject;
            })
        })
    }
}