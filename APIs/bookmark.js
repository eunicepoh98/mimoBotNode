var bookmark = module.exports = {};
var Bookmark = require('../Models').Bookmark;
var model = require('../Models');

/**
 * Get all the Jobs that are bookmarked
 * @param {int} userId - UserID
 * @returns {string} JSON format of all job details that are bookmarked
 */
bookmark.getAllBookmark = function (userId) {
    return new Promise(function (resolve, reject) {
        Bookmark.findAll({
            where: { UserID: userId, RecordStatus: { $not: 'D' } },
            attributes: { exclude: ['RecordStatus', 'LastUpdated'] },
            include: [{
                model: model.Job, attributes: ['JobID', 'JobTitle', 'JobDescription', 'JobQualification', 'JobResponsibilities',
                    'JobPostDate', 'JobPostalCode', 'JobAddress'],
                include: [
                    { model: model.Industry, as: 'Industries', attributes: ['IndustryName'], through: { attributes: [] } },
                    { model: model.JobFunction, as: 'JobFunctions', attributes: ['JobFunctionName'], through: { attributes: [] } },
                    { model: model.JobType, attributes: ['JobType'] },
                    { model: model.Company, attributes: ['CompanyName', 'CompanyAddress', 'CompanyPostalCode'] },
                    {
                        model: model.Salary, attributes: ['SalaryFrom', 'SalaryTo'],
                        include: [{ model: model.Currency, attributes: ['Symbol', 'CurrencyCode'] }]
                    },
                    { model: model.Country, attributes: ['CountryName'] }]
            }]
        }).then(function (data) {
            var jobBookmarkList = [];
            data.forEach(onejob => {
                var newjob = {
                    "JobID": onejob.JobID,
                    "JobTitle": onejob.JobTitle,
                    "JobDescription": onejob.JobDescription,
                    "JobQualification": onejob.JobQualification,
                    "JobPostDate": onejob.JobPostDate,
                    "JobPostalCode": onejob.JobPostalCode,
                    "JobAddress": onejob.JobAddress,
                    "Industries": onejob.Industries,
                    "JobFunctions": onejob.JobFunctions,
                    "JobType": onejob.JobType,
                    "Company": onejob.Company,
                    "Salary": onejob.Salary,
                    "Country": onejob.Country,
                    "isBookmarked": true
                }
                jobBookmarkList.push(newjob);
            });
            resolve(jobBookmarkList)
        }).catch(function (error) {
            console.log("Error: " + error)
            reject(error.toString());
        });
    });
}; //end of getAllBookmark()

/**
 * Get all the Job ID that are bookmarked
 * @param {int} userId - UserID
 * @returns {string} JSON format of all job id that are bookmarked
 */
bookmark.getAllBookmarkID = function (userId) {
    return new Promise(function (resolve, reject) {
        Bookmark.findAll({
            where: { UserID: userId, RecordStatus: { $not: 'D' } },
            attributes: [],
            include: [{
                model: model.Job, attributes: ['JobID'],
            }]
        }).then(function (data) {
            var jobids = [];
            data.forEach(onejob => {
                jobids.push(onejob.Job.JobID);
            });
            resolve(jobids)
        }).catch(function (error) {
            console.log("Error: " + error)
            reject(error.toString());
        });
    });
}; //end of getAllBookmarkID()

/**
 * Add job that is bookmark
 * @param {string} bookmark - JSON format of the bookmark details
 * @returns {string} JSON format of the new Bookmark added
 */
bookmark.addBookmark = function (bookmark) {
    return new Promise(function (resolve, reject) {
        Bookmark.find({ where: { JobID: bookmark.JobID, UserID: bookmark.UserID } })
            .then(function (exist) {
                if (exist) {
                    exist.update({ RecordStatus: 'M', LastUpdated: '' }, { fields: ['RecordStatus', 'LastUpdated'] })
                        .then(function (update) {
                            resolve(JSON.stringify(update))
                        }).catch(function (error) {
                            console.log("Error: " + error)
                            reject(error.toString());
                        });
                } else {
                    Bookmark.create(bookmark)
                        .then(function (newBookmark) {
                            resolve(JSON.stringify(newBookmark));
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
}; //end of addBookmark()

/**
 * remove job from Bookmark
 * @param {string} bookmark - JSON format of the bookmark details
 */
bookmark.removeBookmark = function (jobId, userId) {
    return new Promise(function (resolve, reject) {
        Bookmark.find({ where: { JobID: jobId, UserID: userId } })
            .then(function (bm) {
                if (bm) {
                    bm.update({ RecordStatus: 'D', LastUpdated: '' }, { fields: ['RecordStatus', 'LastUpdated'] })
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
};// end of removeBookmark()
