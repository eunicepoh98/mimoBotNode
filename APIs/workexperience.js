var workexperience = module.exports = {};
var WorkExperience = require('../Models').WorkExperience;

/**
 * Get all the WorkExperience information from the database
 * @param {int} userId - User's ID
 * @returns {string} JSON format of all the WorkExperience details from the database
 */
workexperience.getAllWorkExperience = function (userId) {
    return new Promise(function (resolve, reject) {
        WorkExperience.findAll({
            where: { UserID: userId, RecordStatus: { $not: 'D' } },
            attributes: { exclude: ['RecordStatus', 'LastUpdated'] }
        }).then(function (data) {
            resolve(JSON.stringify(data));
        }).catch(function (error) {
            console.log("Error: " + error)
            reject(error.toString());
        });
    });
}; //end of getAllWorkExperience()

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
                } else {
                    reject("Failed to update Work Experience");
                }
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    });
}; //end of updateAttributes()

/**
 * Destroy WorkExperience information into the database
 * @param {int} id - Work Experience ID to soft delete
 */
workexperience.deleteWorkExperience = function (id) {
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
                } else {
                    reject("Failed to delete Work Experience");
                }
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    });
};// end of deleteWorkExperience()