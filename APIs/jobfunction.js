var jobfunction = module.exports = {};
var JobFunction = require('../Models').JobFunction;

/**
 * Get all the JobFunction information from the database
 * @returns {string} JSON format of all the JobFunction details from the database
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
 * @returns {array} array of all JobFunction Name from the database
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
 * Get the information of one JobFunction from the database based on the ID 
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
            resolve(JSON.stringify(newJobFunction))
        }).catch(function (error) {
            console.log("Error: " + error)
            reject(error.toString());
        });
    });
} //end of addJobFunction()