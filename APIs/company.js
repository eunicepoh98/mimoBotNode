var company = module.exports = {};
var Company = require('../Models').Company;

/**
 * Get all the Company information from the database
 * @returns {string} JSON format of all the Company details from the database
 */
company.getAllCompany = function () {
    return new Promise(function (resolve, reject) {
        Company.findAll({})
            .then(function (data) {
                resolve(JSON.stringify(data));
            }).catch(function (error) {
                console.log("Error: " + error)
                reject({ msg: "An error occurred in the server, Please try again", errMsg: error.toString() });
            });
    });
}; //end of getAllCompany()

/**
 * Get all the Company Names from the database
 * @returns {string} JSON format of all the Company details from the database
 */
company.getAllCompanyName = function () {
    return new Promise(function (resolve, reject) {
        Company.findAll({ attributes: ['CompanyName'] })
            .then(function (data) {
                var array = [];
                data.forEach(function (name) { array.push(name.CompanyName) });
                resolve(array);
            }).catch(function (error) {
                console.log("Error: " + error)
                reject({ msg: "An error occurred in the server, Please try again", errMsg: error.toString() });
            });
    });
}; //end of getAllCompanyName()

/**
 * Get the information of one Company based on the ID from the database
 * @param {int} id - Company's ID
 * @returns {string} JSON format of the Company details
 */
company.getOneCompany = function (id) {
    return new Promise(function (resolve, reject) {
        Company.findById(id)
            .then(function (data) {
                resolve(JSON.stringify(data));
            }).catch(function (error) {
                console.log("Error: " + error)
                reject({ msg: "An error occurred in the server, Please try again", errMsg: error.toString() });
            });
    });
}; //end of getOneCompany()

/**
 * Add Company information into the database
 * @param {string} company - JSON format of the company details
 * @returns {string} JSON format of the information of the new Company added
 */
company.addCompany = function (company) {
    return new Promise(function (resolve, reject) {
        Company.create(company)
            .then(function (newCompany) {
                resolve(JSON.stringify(newCompany))
            }).catch(function (error) {
                console.log("Error: " + error)
                reject({ msg: "An error occurred in the server, Please try again", errMsg: error.toString() });
            });
    });
}; //end of addCompany()