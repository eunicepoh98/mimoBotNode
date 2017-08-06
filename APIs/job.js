var job = module.exports = {};
var Job = require('../Models').Job;
var model = require('../Models');
var path = require('path');
var bookmark = require(path.resolve('./APIs/bookmark.js'));
var usersearch = require(path.resolve('./APIs/usersearch.js'));

/**
 * Get all the Jobs from the database arrange by ID (no filters)
 * @returns {string} JSON format of all the Job details from the database
 */
job.getAllJob = function () {
    return new Promise(function (resolve, reject) {
        getJobs({ RecordStatus: { $not: 'D' } })
            .then(function (data) {
                resolve(JSON.stringify(data));
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    })
} //end of getAllJob()

/**
 * Get all Jobs from the database order by user search history
 * @param {int} userId - User's ID
 * @returns {string} JSON format of all the filtered Jobs
 */
job.getFilteredJob = function (userId) {
    return new Promise(function (resolve, reject) {

        //get jobs based on past search
        usersearch.getUserSearch(userId).then(function (result) {
            filterJobs(result.IndustryList, result.JobFunctionList, result.JobTypeList, []).then(function (result) {
                var jobid = result.jobid;
                var pastsearchjobs = result.filteredjobs;

                // Get all other jobs
                getJobs({ $not: { JobID: jobid }, RecordStatus: { $not: 'D' } }).then(function (data) {
                    var jobresult = (pastsearchjobs).concat(data);

                    // Set whether user has bookmarked the jobs
                    setBookmarks(userId, jobresult)
                        .then(function (result) {
                            resolve(JSON.stringify(result))
                        }).catch(function (error) {
                            console.log("Error: " + error)
                            reject(error.toString());
                        });

                }).catch(function (error) {
                    console.log("Error: " + error)
                    reject(error.toString());
                });
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
        }).catch(function (error) {
            console.log("Error: " + error)
            reject(error.toString());
        });
    });
} //end of getFilteredJob()

/**
 * Get all Jobs order by User search criteria then user search history
 * @param {array} industry - Array of industry name
 * @param {array} jFuntion - Array of jobfunction name
 * @param {array} jType - Array of jobtype
 * @param {int} userId - User's ID
 * @returns {string} JSON format of all the filtered Jobs
 */
job.getUserJob = function (industry, jFuntion, jType, userId) {
    return new Promise(function (resolve, reject) {

        // Get the jobs base on criterias
        filterJobs(industry, jFuntion, jType, []).then(function (result) {
            var jobid = result.jobid;
            var userjobs = result.filteredjobs;

            // Get jobs based on past searches
            usersearch.getUserSearch(userId).then(function (result) {
                filterJobs(result.IndustryList, result.JobFunctionList, result.JobTypeList, jobid).then(function (result) {
                    jobid = jobid.concat(result.jobid);
                    userjobs = userjobs.concat(result.filteredjobs);

                    // Get all other jobs
                    getJobs({ $not: { JobID: jobid }, RecordStatus: { $not: 'D' } }).then(function (data) {
                        var jobresult = userjobs.concat(data);

                        // Set whether user has bookmarked the jobs
                        setBookmarks(userId, jobresult)
                            .then(function (result) {
                                resolve(JSON.stringify(result))
                            }).catch(function (error) {
                                console.log("Error: " + error)
                                reject(error.toString());
                            });

                    }).catch(function (error) {
                        console.log("Error: " + error)
                        reject(error.toString());
                    });
                }).catch(function (error) {
                    console.log("Error: " + error)
                    reject(error.toString());
                });
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
        }).catch(function (error) {
            console.log("Error: " + error)
            reject(error.toString());
        });
    })
} //end of getUserJob()

/**
 * Add Job into the database
 * @param {string} salary - JSON format of the Salary details
 * @param {string} job - JSON format of the Job details
 * @param {array} indID - Array of industry id
 * @param {array} jfID - Array of job function id
 * @returns {string} Information of new Job added in JSON format
 */
job.addJob = function (salary, job, indID, jfID) {
    return new Promise(function (resolve, reject) {
        model.Salary.create(salary).then(function (newSalary) {
            var SalaryID = newSalary.SalaryID;
            job["SalaryID"] = SalaryID;
            Job.create(job).then(function (newJob) {
                indID.forEach(function (currentId) {
                    newJob.addIndustry(currentId).then(function (result) { });
                });
                jfID.forEach(function (currentID) {
                    newJob.addJobFunction(currentID).then(function (result) { });
                });
                resolve(JSON.stringify(newJob));
            }).catch(function (error) {
                console.log("Error: " + error);
                reject(error.toString());
            });
        }).catch(function (error) {
            console.log("Error: " + error);
            reject(error.toString());
        });
    });
} //end of addJob()


/**
 * Get the information of one Job from the database based on the ID 
 * @param {int} id - Job's ID
 * @returns {string} JSON format of one Job details
 */
job.getOneJob = function (id) {
    return new Promise(function (resolve, reject) {
        Job.findOne({
            where: { JobID: id },
            attributes: ['JobID', 'JobTitle', 'JobDescription', 'JobQualification', 'JobResponsibilities',
                'JobPostDate', 'JobPostalCode', 'JobAddress'],
            include: [
                { model: model.Industry, attributes: ['IndustryName'], through: { attributes: [] } },
                { model: model.JobFunction, attributes: ['JobFunctionName'], through: { attributes: [] } },
                { model: model.JobType, attributes: ['JobType'] },
                { model: model.Company, attributes: ['CompanyName', 'CompanyAddress', 'CompanyPostalCode'] },
                {
                    model: model.Salary,
                    attributes: ['SalaryFrom', 'SalaryTo'],
                    include: [{ model: model.Currency, attributes: ['Symbol', 'CurrencyCode'] }]
                },
                { model: model.Country, attributes: ['CountryName'] }]
        }).then(function (data) {
            resolve(JSON.stringify(data));
        }).catch(function (error) {
            console.log("Error: " + error)
            reject(error.toString());
        });
    })
} //end of getOneJob()

/**
 * Get jobs based on criteria
 * @param {string} criteria - sql statement criteria
 * @returns {string} JSON format of jobs and jobid
 */
function getJobs(criteria) {
    return new Promise(function (resolve, reject) {
        Job.findAll({
            where: criteria,
            order: [['JobPostDate', 'DESC']],
            attributes: ['JobID', 'JobTitle', 'JobDescription', 'JobQualification', 'JobResponsibilities',
                'JobPostDate', 'JobPostalCode', 'JobAddress'],
            include: [
                { model: model.Industry, attributes: ['IndustryName'], through: { attributes: [] } },
                { model: model.JobFunction, attributes: ['JobFunctionName'], through: { attributes: [] } },
                { model: model.JobType, attributes: ['JobType'] },
                { model: model.Company, attributes: ['CompanyName', 'CompanyAddress', 'CompanyPostalCode'] },
                {
                    model: model.Salary, attributes: ['SalaryFrom', 'SalaryTo'],
                    include: [{ model: model.Currency, attributes: ['Symbol', 'CurrencyCode'] }]
                },
                { model: model.Country, attributes: ['CountryName'] }]
        }).then(function (data) {
            resolve(data);
        }).catch(function (error) {
            console.log("Error: " + error)
            reject(error.toString());
        });
    })
} // end of getJobs()

/**
 * Get jobs based on industry, job functin, job type and job ids
 * @param {array} industry - array of industry
 * @param {array} jFuntion - array of job function
 * @param {array} jType - array of job type
 * @param {array} jobid - array of jobids to not select
 * @returns {string} JSON format of jobs and their jobids
 */
function filterJobs(industry, jFuntion, jType, jobid) {
    return new Promise(function (resolve, reject) {
        var everything = [], name = [], title = [], des = [], qual = [], res = [], synonyms = [], whereStuff;

        // Formatting query conditions
        for (i = 0; i < industry.length; i++) {
            name.push({ '$Industries.IndustryName$': { $like: '%' + industry[i] + '%' } });
            title.push({ JobTitle: { $like: '%' + industry[i] + '%' } });
            des.push({ JobDescription: { $like: '%' + industry[i] + '%' } });
            qual.push({ JobQualification: { $like: '%' + industry[i] + '%' } });
            res.push({ JobResponsibilities: { $like: '%' + industry[i] + '%' } });
            synonyms.push({ '$Industries.Synonyms$': { $like: '%' + industry[i] + '%' } });
        }
        for (i = 0; i < jFuntion.length; i++) {
            name.push({ '$JobFunctions.JobFunctionName$': { $like: '%' + jFuntion[i] + '%' } });
            title.push({ JobTitle: { $like: '%' + jFuntion[i] + '%' } });
            des.push({ JobDescription: { $like: '%' + jFuntion[i] + '%' } });
            qual.push({ JobQualification: { $like: '%' + jFuntion[i] + '%' } });
            res.push({ JobResponsibilities: { $like: '%' + jFuntion[i] + '%' } });
            synonyms.push({ '$JobFunctions.Synonyms$': { $like: '%' + jFuntion[i] + '%' } });
        }
        if (name.length > 0) { everything.push({ $or: name }); }
        if (title.length > 0) { everything.push({ $or: title }); }
        if (des.length > 0) { everything.push({ $or: des }); }
        if (qual.length > 0) { everything.push({ $or: qual }); }
        if (res.length > 0) { everything.push({ $or: res }); }
        if (synonyms.length > 0) { everything.push({ $or: synonyms }); }
        if (everything.length > 0) {
            if (jobid.length > 0) {
                whereStuff = { $or: everything, $not: { JobID: jobid }, RecordStatus: { $not: 'D' } } // dont get these jobids
            } else {
                whereStuff = { $or: everything, RecordStatus: { $not: 'D' } }
            }
        }
        else {
            if (jobid.length > 0) {
                whereStuff = { $not: { JobID: jobid }, RecordStatus: { $not: 'D' } }
            } else {
                whereStuff = { RecordStatus: { $not: 'D' } }
            }
        }
        var filteredjobs = [];

        // Get the jobs
        Job.findAll({
            where: whereStuff,
            order: [['JobPostDate', 'DESC']],
            attributes: ['JobID', 'JobTitle', 'JobDescription', 'JobQualification', 'JobResponsibilities',
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
        }).then(function (data) {
            var jobid = [], relevantJT = [], otherJT = [];
            data.forEach(function (one) {

                // jobids of selected job
                jobid.push(one.JobID);

                // grouping by job type
                if (jType.includes(one.JobType.JobType)) {
                    relevantJT.push(one);
                } else {
                    otherJT.push(one);
                }
            });
            filteredjobs = relevantJT.concat(otherJT);
            resolve({ filteredjobs: filteredjobs, jobid: jobid });
        }).catch(function (error) {
            console.log("Error: " + error)
            reject(error.toString());
        });
    });
} // end of filterJobs()

/**
 * Check and set whether the user has bookmark the job 
 * @param {int} userId - User's ID
 * @param {array} joblist - List of job
 * @returns {string} JSON format of one Job
 */
function setBookmarks(userId, joblist) {
    return new Promise(function (resolve, reject) {
        var jobBookmarkList = [];
        bookmark.getAllBookmarkID(userId).then(ids => {
            joblist.forEach(onejob => {
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
                    "isBookmarked": false
                }
                if (ids.includes(onejob.JobID)) { newjob["isBookmarked"] = true; }
                jobBookmarkList.push(newjob);
            });
            resolve(jobBookmarkList)
        }).catch(function (error) {
            console.log("Error: " + error)
            reject(error.toString());
        });
    });
} // end of setBookmarks()