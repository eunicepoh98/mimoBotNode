var application = module.exports = {};
var Application = require('../Models').Application;
var model = require('../Models');

/**
 * Get all user past applications
 * @param {int} userId - UserID
 * @returns {string} JSON format of application details
 */
application.getAllApplication = function (userId) {
    return new Promise(function (resolve, reject) {
        Application.findAll({
            where: { UserID: userId, RecordStatus: { $not: 'D' } },
            attributes: { exclude: ['RecordStatus', 'LastUpdated'] },
            include: [{
                model: model.Resume, attributes: ['FileName'],
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
            resolve(JSON.stringify(data))
        }).catch(function (error) {
            console.log("Error: " + error)
            reject(error.toString());
        });
    });
}; //end of getAllApplication()

/**
 * Send application
 * @param {string} application - JSON format of the application details
 * @returns {string} JSON format of the new Application added
 */
application.sendApplication = function (application) {
    return new Promise(function (resolve, reject) {
        // Check if Resume exist
        model.Resume.find({ where: { ResumeID: application.ResumeID, RecordStatus: { $not: 'D' } } })
            .then(function (resume) {
                if (resume) {
                    // Check for previous applications
                    Application.find({ where: { JobID: application.JobID, UserID: application.UserID } })
                        .then(function (exist) {
                            if (exist) {
                                reject("You have already applied for this Job");
                            } else {
                                //Send Application here

                                // Create application record in database
                                Application.create(application)
                                    .then(function (newApplication) {
                                        resolve(JSON.stringify(newApplication));
                                    }).catch(function (error) {
                                        console.log("Error: " + error)
                                        reject(error.toString());
                                    });
                            }
                        }).catch(function (error) {
                            console.log("Error: " + error)
                            reject(error.toString());
                        });
                } else {
                    reject("Resume not valid")
                }
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    });
}; //end of sendApplication()