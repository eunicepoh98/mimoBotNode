var job = module.exports = {};
var Job = require('../Models').Job;
var model = require('../Models');
var path = require('path');
var shuffle = require('shuffle-array');
var bookmark = require(path.resolve('./APIs/bookmark.js'));
var usersearch = require(path.resolve('./APIs/usersearch.js'));

/**
 * Get all the Jobs from the database arrange by ID (no filters)
 * @returns {string} JSON format of all the Job details from the database
 */
job.getAllJob = function () {
    return new Promise(function (resolve, reject) {
        Job.findAll({
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
} //end of getAllJob()

/** NOT DONE
 * Get all Jobs from the database based on Industries, Job Functions and more variety search from other columns
 * @param {array} industry - Array of industry name
 * @param {array} jFuntion - Array of jobfunction name
 * @param {array} jType - Array of jobtype
 * @returns {string} JSON format of all the filtered Jobs
 */
job.getFilteredJob = function (userId) {
    return new Promise(function (resolve, reject) {

        //get jobs based on past search
        getPastSearchJobs(userId).then(function (result) {
            // Get all other jobs
            Job.findAll({
                where: { $not: { JobID: result.jobid } },
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
                shuffle(data);
                var jobresult = (result.pastsearchjobs).concat(data);

                // Set whether user has bookmarked the jobs
                setBookmarks(userId, jobresult)
                    .then(function (result) {
                        resolve(JSON.stringify(result))
                    }).catch(function (error) {
                        console.log("Error: " + error)
                        reject(error.toString());
                    });
            });
        }).catch(function (error) {
            console.log("Error: " + error)
            reject(error.toString());
        });
    });
} //end of getFilteredJob()

/**
 * Get all Jobs order by User search criteria - Industries, Job Functions and Job Types
 * @param {array} industry - Array of industry name
 * @param {array} jFuntion - Array of jobfunction name
 * @param {array} jType - Array of jobtype
 * @returns {string} JSON format of all the filtered Jobs
 */
job.getUserJob = function (industry, jFuntion, jType, userId) {
    return new Promise(function (resolve, reject) {

        // Set SQL querying condition base on industry name
        var indWhereCondition, listOfIndNameSynonyms = [];
        if (industry.length == 0) { indWhereCondition = {}; }
        else {
            var listOfIndName = [], listOfIndSynonyms = [];
            for (i = 0; i < industry.length; i++) { // loop through array of industry name
                listOfIndName.push({ IndustryName: { $like: '%' + industry[i] + '%' } }); // sql condition where IndustryName like industry name
                listOfIndSynonyms.push({ Synonyms: { $like: '%' + industry[i] + '%' } }); // sql condition where Synonyms like industry name
            }
            if (listOfIndName.length > 0) { listOfIndNameSynonyms.push({ $or: listOfIndName }); } // if list of industry not empty push to array
            if (listOfIndSynonyms.length > 0) { listOfIndNameSynonyms.push({ $or: listOfIndSynonyms }); } // if list of synonyms not empty push to array
            if (listOfIndNameSynonyms.length > 0) {
                indWhereCondition = { $or: listOfIndNameSynonyms }; //if array not empty set or condition
            } else { indWhereCondition = {}; }
        }

        // Set SQL querying condition base on job function name
        var jfWhereCondition, listOfJFNameSynonyms = [];
        if (jFuntion.length == 0) { jfWhereCondition = {}; }
        else {
            var listOfJFName = [], listOfJFSynonyms = [];
            for (i = 0; i < jFuntion.length; i++) {
                listOfJFName.push({ JobFunctionName: { $like: '%' + jFuntion[i] + '%' } });
                listOfJFSynonyms.push({ Synonyms: { $like: '%' + jFuntion[i] + '%' } });
            }
            if (listOfJFName.length > 0) { listOfJFNameSynonyms.push({ $or: listOfJFName }); }
            if (listOfJFSynonyms.length > 0) { listOfJFNameSynonyms.push({ $or: listOfJFSynonyms }); }
            if (listOfJFNameSynonyms.length > 0) {
                jfWhereCondition = { $or: listOfJFNameSynonyms };
            } else { jfWhereCondition = {}; }
        }

        var userjobs = [];

        // Get the jobs base on criterias from database
        Job.findAll({
            attributes: ['JobID', 'JobTitle', 'JobDescription', 'JobQualification', 'JobResponsibilities',
                'JobPostDate', 'JobPostalCode', 'JobAddress'],
            include: [
                {
                    model: model.Industry, where: indWhereCondition,
                    attributes: ['IndustryName'], through: { attributes: [] }
                },
                {
                    model: model.JobFunction, where: jfWhereCondition,
                    attributes: ['JobFunctionName'], through: { attributes: [] }
                },
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
                jobid.push(one.JobID);
                // group by job type
                if (jType.includes(one.JobType.JobType)) {
                    relevantJT.push(one);
                } else {
                    otherJT.push(one);
                }
            });
            shuffle(relevantJT);
            shuffle(otherJT);
            userjobs = relevantJT.concat(otherJT);

            // get all other jobs
            Job.findAll({
                where: { $not: { JobID: jobid } },
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
                shuffle(data);
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
    });
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
 * Get jobs based on user's past searches 
 * @param {int} userId - User's ID
 * @returns {string} JSON format of jobs and jobid
 */
function getPastSearchJobs(userId) {
    return new Promise((resolve, reject) => {
        var industry = [], jFuntion = [], jType = [];
        usersearch.getUserSearch(userId).then(function (result) {
            industry = result.IndustryList;
            jFuntion = result.JobFunctionList;
            jType = result.JobTypeList;

            // Formatting query conditions
            var everything = [], name = [], title = [], des = [], qual = [], res = [], synonyms = [], whereStuff;
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
            if (everything.length > 0) { whereStuff = { $or: everything }; }
            else { whereStuff = {}; }

            var pastsearchjobs = [];

            // Get jobs based on past search results
            Job.findAll({
                where: whereStuff,
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
                    jobid.push(one.JobID);
                    // group by job type
                    if (jType.includes(one.JobType.JobType)) {
                        relevantJT.push(one);
                    } else {
                        otherJT.push(one);
                    }
                });
                shuffle(relevantJT);
                shuffle(otherJT);
                pastsearchjobs = relevantJT.concat(otherJT);
                resolve({ pastsearchjobs: pastsearchjobs, jobid: jobid });
            })
        })
    })
}

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
}