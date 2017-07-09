var industry = module.exports = {};
var Industry = require('../Models').Industry;

/**
 * Get all the Industry information from the database
 * @returns {string} JSON format of all the Industry details from the database
 */
industry.getAllIndustry = function () {
    return new Promise(function (resolve, reject) {
        Industry.findAll({})
            .then(function (data) {
                resolve(JSON.stringify(data));
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    });
} //end of getAllIndustry()

/**
 * Get all the Industry name from the database
 * @returns {array} array of all Industry Name from the database
 */
industry.getAllIndustryName = function () {
    return new Promise(function (resolve, reject) {
        Industry.findAll({ attributes: ['IndustryName'] })
            .then(function (data) {
                var array = [];
                data.forEach(function (name) { array.push(name.IndustryName) });
                resolve(array);
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    });
}//end of getAllIndustryName()

/**
 * Get the information of one Industry from the database based on the ID 
 * @param {int} id - Industry's ID
 * @returns {string} JSON format of one Industry details
 */
industry.getOneIndustry = function (id) {
    return new Promise(function (resolve, reject) {
        Industry.findById(id)
            .then(function (data) {
                resolve(JSON.stringify(data));
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    });
}//end of getOneIndustry()

/**
 * Add Industry into the database
 * @param {string} industry - JSON format of the industry details
 * @returns {string} Information of new Industry added in JSON format
 */
industry.addIndustry = function (industry) {
    return new Promise(function (resolve, reject) {
        console.log(industry)
        Industry.create(industry).then(function (newIndustry) {
            resolve(JSON.stringify(newIndustry))
        }).catch(function (error) {
            console.log("Error: " + error)
            reject(error.toString());
        });
    });
}//end of addIndustry()