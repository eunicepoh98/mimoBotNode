var industry = module.exports = {};
var Industry = require('../Models').Industry;
var path = require('path');
var witdata = require(path.resolve('./APIs/witdata.js'));

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
                reject({ msg: "An error occurred in the server, Please try again", errMsg: error.toString() });
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
                reject({ msg: "An error occurred in the server, Please try again", errMsg: error.toString() });
            });
    });
}//end of getAllIndustryName()

/**
 * Get all the Industry name from the database
 * @returns {array} array of all Industry Synonyms from the database
 */
industry.getAllIndustrySynonyms = function () {
    return new Promise(function (resolve, reject) {
        Industry.findAll({ attributes: ['Synonyms'] })
            .then(function (data) {
                var array = [];
                data.forEach(function (oneIndustrySynonyms) {
                    JSON.parse(oneIndustrySynonyms.Synonyms).forEach(function (onesynonyms) {
                        array.push(onesynonyms)
                    });
                });
                resolve(array);
            }).catch(function (error) {
                console.log("Error: " + error)
                reject({ msg: "An error occurred in the server, Please try again", errMsg: error.toString() });
            });
    });
}//end of getAllIndustrySynonyms()

/**
 * Get one Industry from the database
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
                reject({ msg: "An error occurred in the server, Please try again", errMsg: error.toString() });
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
            reject({ msg: "An error occurred in the server, Please try again", errMsg: error.toString() });
        });
    });
}//end of addIndustry()

/**
 * Add new Industry synonyms
 * @param {array} newSynonyms - Array of industry synonyms to add
 * @returns {array} array of all Industry Synonyms from the database
 */
industry.addIndustrySynonyms = function (indId, newSynonyms) {
    return new Promise(function (resolve, reject) {
        Industry.find({ where: { IndustryID: indId } })
            .then(function (data) {
                var oldSynonyms = [];
                JSON.parse(data.Synonyms).forEach(function (onesynonyms) {
                    oldSynonyms.push(onesynonyms)
                });
                var updateSynonyms = oldSynonyms.concat(newSynonyms);
                newSynonyms.forEach(function (one) {
                    witdata.addKeywordToEntity('industry_type', one);
                })
                data.update({ Synonyms: JSON.stringify(updateSynonyms), LastUpdated: '' }, { fields: ['Synonyms', 'LastUpdated'] })
                    .then(function (update) {
                        resolve({ data: JSON.stringify(update), msg: 'Successfully updated industry synonyms' })
                    }).catch(function (error) {
                        console.log("Error: " + error)
                        reject({ msg: "An error occurred in the server, Please try again", errMsg: error.toString() });
                    });
            }).catch(function (error) {
                console.log("Error: " + error)
                reject({ msg: "An error occurred in the server, Please try again", errMsg: error.toString() });
            });
    });
}//end of getAllIndustrySynonyms()