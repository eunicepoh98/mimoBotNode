var resume = module.exports = {};
var Resume = require('../models').Resume;

/**
 * Get all the User Resumes
 * @param {int} userId - User's ID
 * @returns {string} JSON format of all the Resume details 
 */
resume.getAllResume = function (userId) {
    return new Promise(function (resolve, reject) {
        Resume.findAll({
            where: { UserID: userId, RecordStatus: { $not: 'D' } }
        }).then(function (data) {
            resolve(JSON.stringify(data));
        }).catch(function (error) {
            console.log("Error: " + error)
            reject(error.toString());
        });
    });
}; //end of getAllResume()

/**
 * Add Resume details
 * @param {int} userId - User's ID
 * @param {string} description - Description of resume
 * @returns {string} JSON format of the information of the new Resume added
 */
resume.addResume = function (userId, description) {
    return new Promise(function (resolve, reject) {
        var newResume = {
            UserID: userId,
            Description: description,
            MD5Code: "",
            PathName: "",
            FileName: "",
        }
        Resume.create(newResume)
            .then(function (result) {
                resolve(JSON.stringify(result))
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    });
}; //end of addResume()

/**
 * Update Resume information into the database
 * @param {int} id - Resume ID
 * @param {string} description - Description of resume
 * @returns {string} JSON format of updated Resume information
 */
resume.updateAttributes = function (id, description) {
    return new Promise(function (resolve, reject) {
        Resume.find({ where: { ResumeID: id } })
            .then(function (oneResume) {
                if (oneResume) {
                    oneResume.update({ LastUpdated: '', Description: description })
                        .then(function (update) {
                            resolve(JSON.stringify(update))
                        }).catch(function (error) {
                            console.log("Error: " + error)
                            reject(error.toString());
                        });
                } else {
                    reject("Failed to update Resume");
                }
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    });
}; //end of updatAttributes()


/**
 * Remove Resume information into the database
 * @param {int} id - ResumeId to remove
 */
resume.deleteResume = function (id) {
    return new Promise(function (resolve, reject) {
        Resume.find({ where: { ResumeID: id } })
            .then(function (one) {
                if (one) {
                    one.update({ RecordStatus: 'D', LastUpdated: '' }, { fields: ['RecordStatus', 'LastUpdated'] })
                        .then(function (update) {
                            resolve(JSON.stringify(update))
                        }).catch(function (error) {
                            console.log("Error: " + error)
                            reject(error.toString());
                        });
                } else {
                    reject("Failed to delete Resume");
                }
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    });
};// end of deleteResume()