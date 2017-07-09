var jobtype = module.exports = {};
var JobType = require('../Models').JobType;

/**
 * Get all the JobType information from the database
 * @returns {string} JSON format of all the JobType details from the database
 */
jobtype.getAllJobType = function () {
    return new Promise(function (resolve, reject) {
        JobType.findAll({})
            .then(function (data) {
                resolve(JSON.stringify(data));
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    });
} //end of getAllJobType()

/**
 * Get all the JobType name from the database
 * @returns {array} array of all JobType Name from the database
 */
jobtype.getAllJobTypeName = function () {
    return new Promise(function (resolve, reject) {
        JobType.findAll({ attribute: ['JobType'] })
            .then(function (data) {
                var array = []
                data.forEach(function (name) { array.push(name.JobType) });
                resolve(array);
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    });
} //end of getAllJobTypeName()

/**
 * Get the information of one JobType from the database based on the ID 
 * @param {int} id - JobType's ID
 * @returns {string} JSON format of one JobType details
 */
jobtype.getOneJobType = function (id) {
    return new Promise(function (resolve, reject) {
        JobType.findById(id)
            .then(function (data) {
                resolve(JSON.stringify(data));
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    });
} //end of getOneJobType()

/**
 * Add JobType into the database
 * @param {string} jobtype - JSON format of the JobType details
 * @returns {string} Information of new JobType added in JSON format
 */
jobtype.addJobType = function (jobtype) {
    return new Promise(function (resolve, reject) {
        JobType.create(jobtype).then(function (newJobType) {
            resolve(JSON.stringify(newJobType))
        }).catch(function (error) {
            console.log("Error: " + error)
            reject(error.toString());
        });
    });
} //end of addJobType()