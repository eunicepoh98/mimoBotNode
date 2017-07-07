var company = module.exports = {};
var Company = require('../Models').Company;
var model = require('../Models');

company.api = {
    getAllCompany: function () {
        return new Promise(function (resolve, reject) {
            Company.findAll({})
                .then(function (data) {
                    console.log(data);
                    res.send(JSON.stringify(data));
                })
        })
    },
    getAllCompanyName: function () {
        return new Promise(function (resolve, reject) {
            Company.findAll({
                attributes: ['CompanyName']
            })
                .then(function (data) {
                    var array = []
                    data.forEach(function (name) {
                        array.push(name.CompanyName)
                    });
                    resolve(array);
                })
        })
    },
    getOneCompany: function (id) {
        return new Promise(function (resolve, reject) {
            Company.findById(id)
                .then(function (data) {
                    resolve(JSON.stringify(data));
                })
        })
    },
    addCompany: function (company) {
        return new Promise(function (resolve, reject) {
            Company.create(company).then(function (newCompany) {
                resolve(JSON.stringify(newCompany))
            }).catch(function (error) {
                console.log("Error: " + error)
                reject;
            })
        })
    }
}