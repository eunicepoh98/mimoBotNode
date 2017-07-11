var workexperience = module.exports = {};
var WorkExperience = require('../Models').WorkExperience;
var model = require('../Models');

/**
 * Get all the WorkExperience information from the database
 * @param {int} userId - User's ID
 * @returns {string} JSON format of all the WorkExperience details from the database
 */
workexperience.getAllWorkExperience = function (userId) {
    return new Promise(function (resolve, reject) {
        WorkExperience.findAll({
            where: { UserID: userId, RecordStatus: {$not: 'D'} }
        }).then(function (data) {
            resolve(JSON.stringify(data));
        }).catch(function (error) {
            console.log("Error: " + error)
            reject(error.toString());
        });
    })
}; //end of getAllWorkExperience()

/**
 * Get the information of one WorkExperience based on the ID from the database
 * @param {int} id - WorkExperience's ID
 * @returns {string} JSON format of the WorkExperience details
 */
workexperience.getOneWorkExperience = function (id) {
    return new Promise(function (resolve, reject) {
        WorkExperience.findById(id)
            .then(function (data) {
                resolve(JSON.stringify(data));
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    })
}; //end of getOneWorkExperience() 

/**
 * Add WorkExperience information into the database
 * @param {string} workexperience - JSON format of the workexperience details
 * @returns {string} JSON format of the information of the new WorkExperience added
 */
workexperience.addWorkExperience = function (workexperience) {
    return new Promise(function (resolve, reject) {
        WorkExperience.create(workexperience)
            .then(function (newWorkExperience) {
                resolve(JSON.stringify(newWorkExperience))
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    });
}; //end of addWorkExperience()

/**
 * Update WorkExperience information into the database
 * @param {id} id - The WorkExperience ID to update
 * @param {string} workexperience - JSON format of the workexperience details
 * @returns {string} JSON format of the information of the new WorkExperience added
 */

workexperience.updateAttributes = function (id, workexperience) {
    return new Promise(function (resolve, reject) {
        WorkExperience.find({ where: { WorkExperienceID: id } })
            .then(function (we) {
                if (we) {
                    workexperience["LastUpdated"] = '';
                    we.update(workexperience)
                        .then(function (update) {
                            resolve(JSON.stringify(update))
                        }).catch(function (error) {
                            console.log("Error: " + error)
                            reject(error.toString());
                        });
                }
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    });
}; //end of updatAttributes()

/**
 * Destroy WorkExperience information into the database
 * @param {int} id - Work Experience ID to soft delete
 */
workexperience.delete = function (id) {
    return new Promise(function (resolve, reject) {
        WorkExperience.find({ where: { WorkExperienceID: id } })
            .then(function (we) {
                if (we) {
                    we.update({ RecordStatus: 'D', LastUpdated: '' }, { fields: ['RecordStatus', 'LastUpdated'] })
                        .then(function (update) {
                            resolve(JSON.stringify(update))
                        }).catch(function (error) {
                            console.log("Error: " + error)
                            reject(error.toString());
                        });
                }
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    });
};// end of detroy()