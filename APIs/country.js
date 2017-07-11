var country = module.exports = {};
var Country = require('../Models').Country;

/**
 * Get all the Country information from the database
 * @returns {string} JSON format of all the Country details from the database
 */
country.getAllCountry = function () {
    return new Promise(function (resolve, reject) {
        Country.findAll({})
            .then(function (data) {
                resolve(JSON.stringify(data));
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    });
}; //end of getAllCountry()

/**
 * Get all the Country Names from the database
 * @returns {string} JSON format of all the Country details from the database
 */
country.getAllCountryName = function () {
    return new Promise(function (resolve, reject) {
        Country.findAll({ attributes: ['CountryName'] })
            .then(function (data) {
                var array = [];
                data.forEach(function (name) { array.push(name.CountryName) });
                resolve(array);
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    });
}; //end of getAllCountryName()

/**
 * Get the information of one Country based on the ID from the database
 * @param {int} id - Country's ID
 * @returns {string} JSON format of the Country details
 */
country.getOneCountry = function (id) {
    return new Promise(function (resolve, reject) {
        Country.findById(id)
            .then(function (data) {
                resolve(JSON.stringify(data));
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    });
}; //end of getOneCountry()

/**
 * Add Country information into the database
 * @param {string} country - JSON format of the country details
 * @returns {string} JSON format of the information of the new Country added
 */
country.addCountry = function (country) {
    return new Promise(function (resolve, reject) {
        Country.create(country)
            .then(function (newCountry) {
                resolve(JSON.stringify(newCountry))
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    });
}; //end of addCountry()