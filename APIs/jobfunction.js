var jobfunction = module.exports = {};
var JobFunction = require('../Models').JobFunction;
var path = require('path');
var witdata = require(path.resolve('./APIs/witdata.js'));

/**
 * Get all the JobFunction information from the database
 * @returns {string} JSON format of all the JobFunction details
 */
jobfunction.getAllJobFunction = function () {
    return new Promise(function (resolve, reject) {
        JobFunction.findAll({})
            .then(function (data) {
                resolve(JSON.stringify(data));
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    });
} //end of getAllJobFunction()

/**
 * Get all the JobFunction name from the database
 * @returns {array} array of all JobFunction Name
 */
jobfunction.getAllJobFunctionName = function () {
    return new Promise(function (resolve, reject) {
        JobFunction.findAll({ attributes: ['JobFunctionName'] })
            .then(function (data) {
                var array = [];
                data.forEach(function (name) { array.push(name.JobFunctionName) });
                resolve(array);
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    });
} //end of getAllJobFunctionName()

/**
 * Get all the JobFunction Synonyms from the database
 * @returns {array} array of all JobFunction Synonyms
 */
jobfunction.getAllJobFunctionSynonyms = function () {
    return new Promise(function (resolve, reject) {
        JobFunction.findAll({ attributes: ['Synonyms'] })
            .then(function (data) {
                var array = [];
                data.forEach(function (oneJobFunctionSynonyms) {
                    JSON.parse(oneJobFunctionSynonyms.Synonyms).forEach(function (onesynonyms) {
                        array.push(onesynonyms)
                    });
                });
                resolve(array);
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    });
} //end of getAllJobFunctionSynonyms()

/**
 * Get one JobFunction from the database
 * @param {int} id - JobFunction's ID
 * @returns {string} JSON format of one JobFunction details
 */
jobfunction.getOneJobFunction = function (id) {
    return new Promise(function (resolve, reject) {
        JobFunction.findById(id)
            .then(function (data) {
                resolve(JSON.stringify(data));
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    });
} //end of getOneJobFunction()

/**
 * Add JobFunction into the database
 * @param {string} jobFunction - JSON format of the JobFunction details
 * @returns {string} Information of new JobFunction added in JSON format
 */
jobfunction.addJobFunction = function (jobFunction) {
    return new Promise(function (resolve, reject) {
        JobFunction.create(jobFunction).then(function (newJobFunction) {
            resolve({ data: JSON.stringify(jobFunction), msg: 'Successfully added jobfunction' })
        }).catch(function (error) {
            console.log("Error: " + error)
            reject(error.toString());
        });
    });
} //end of addJobFunction()

/**
 * Add new JobFunction synonyms
 * @param {array} newSynonyms - Array of jobfunction synonyms to add
 * @returns {array} array of all JobFunction Synonyms from the database
 */
jobfunction.addJobFunctionSynonyms = function (indId, newSynonyms) {
    return new Promise(function (resolve, reject) {
        JobFunction.find({ where: { JobFunctionID: indId } })
            .then(function (data) {
                var oldSynonyms = [];
                JSON.parse(data.Synonyms).forEach(function (onesynonyms) {
                    oldSynonyms.push(onesynonyms)
                });
                var updateSynonyms = oldSynonyms.concat(newSynonyms);
                newSynonyms.forEach(function (one) {
                    witdata.addKeywordToEntity('job_function', one);
                })
                data.update({ Synonyms: JSON.stringify(updateSynonyms), LastUpdated: '' }, { fields: ['Synonyms', 'LastUpdated'] })
                    .then(function (update) {
                        resolve({ data: JSON.stringify(update), msg: 'Successfully added jobfunction synonyms' })
                    }).catch(function (error) {
                        console.log("Error: " + error)
                        reject(error.toString());
                    });
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    });
}//end of getAllJobFunctionSynonyms()