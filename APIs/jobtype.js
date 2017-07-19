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
 * Get all the JobType Synonyms from the database
 * @returns {array} array of all JobType Synonyms
 */
jobtype.getAllJobTypeSynonyms = function () {
    return new Promise(function (resolve, reject) {
        JobType.findAll({ attribute: ['Synonyms'] })
            .then(function (data) {
                var array = [];
                data.forEach(function (oneJobTypeSynonyms) {
                    JSON.parse(oneJobTypeSynonyms.Synonyms).forEach(function (onesynonyms) {
                        array.push(onesynonyms)
                    });
                });
                resolve(array);
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    });
} //end of getAllJobTypeSynonyms()

/**
 * Get one JobType from the database based on the ID 
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

/**
 * Add new JobType synonyms
 * @param {array} newSynonyms - Array of jobtype synonyms to add
 * @returns {array} array of all JobType Synonyms from the database
 */
jobtype.addJobTypeSynonyms = function (jtId, newSynonyms) {
    return new Promise(function (resolve, reject) {
        JobType.find({ where: { JobTypeID: jtId } })
            .then(function (data) {
                var oldSynonyms = [];
                JSON.parse(data.Synonyms).forEach(function (onesynonyms) {
                    oldSynonyms.push(onesynonyms)
                });
                var updateSynonyms = oldSynonyms.concat(newSynonyms);
                data.update({ Synonyms: JSON.stringify(updateSynonyms), LastUpdated: '' }, { fields: ['Synonyms', 'LastUpdated'] })
                    .then(function (update) {
                        resolve({ data: JSON.stringify(update), msg: 'Successfully updated jobtype synonyms' })
                    }).catch(function (error) {
                        console.log("Error: " + error)
                        reject(error.toString());
                    });
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    });
}//end of getAllJobTypeSynonyms()