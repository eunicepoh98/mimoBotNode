var job = module.exports = {};
var Job = require('../Models').Job;
var model = require('../Models');

job.api = {

    getAllJob: function () {
        return new Promise(function (resolve, reject) {
            Job.findAll({
                order: [],
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
            })
                .then(function (data) {
                    resolve(JSON.stringify(data))
                })
        })
    },
    getOneJob: function (id) {
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
            })
                .then(function (data) {
                    resolve(data);
                })
        })
    },
    getFilteredJob: function () {
        return new Promise(function (resolve, reject) {
            var industry = 'aerospace'
            var jFuntion = 'engineering'
            var jType = 'full time'
            Job.findAll({
                where: {
                    $or: [
                        {
                            $or:
                            [
                                { '$Industries.IndustryName$': { $like: '%' + industry + '%' } },
                                { '$JobFunctions.JobFunctionName$': { $like: '%' + jFuntion + '%' } }
                            ]
                        },
                        {
                            $or:
                            [
                                { JobTitle: { $like: '%' + industry + '%' } },
                                { JobTitle: { $like: '%' + jFuntion + '%' } }
                            ]
                        },
                        {
                            $or:
                            [
                                { JobDescription: { $like: '%' + industry + '%' } },
                                { JobDescription: { $like: '%' + jFuntion + '%' } }
                            ]
                        },
                        {
                            $or:
                            [
                                { JobQualification: { $like: '%' + industry + '%' } },
                                { JobQualification: { $like: '%' + jFuntion + '%' } }
                            ]
                        },
                        {
                            $or:
                            [
                                { JobResponsibilities: { $like: '%' + industry + '%' } },
                                { JobResponsibilities: { $like: '%' + jFuntion + '%' } }
                            ]
                        }
                    ]
                },
                attributes: ['JobID', 'JobTitle', 'JobDescription', 'JobQualification', 'JobResponsibilities',
                    'JobPostDate', 'JobPostalCode', 'JobAddress'],
                include: [
                    {
                        model: model.Industry,
                        as: 'Industries',
                        attributes: ['IndustryName'], through: { attributes: [] }
                    },
                    {
                        model: model.JobFunction,
                        as: 'JobFunctions',
                        attributes: ['JobFunctionName'], through: { attributes: [] }
                    },
                    {
                        model: model.JobType,
                        // as: 'JobTypes',
                        attributes: ['JobType']
                    },
                    { model: model.Company, attributes: ['CompanyName', 'CompanyAddress', 'CompanyPostalCode'] },
                    {
                        model: model.Salary,
                        attributes: ['SalaryFrom', 'SalaryTo'],
                        include: [{ model: model.Currency, attributes: ['Symbol', 'CurrencyCode'] }]
                    },
                    { model: model.Country, attributes: ['CountryName'] }]
            })
                .then(function (data) {
                    resolve(data)
                })
        })
    },
    getUserJob: function (industry, jFuntion, jType) { // get jobs base on user's filter
        // var industry = ["fishing"], jFuntion = [], jType = []
        return new Promise(function (resolve, reject) {
            var whereInd
            if (industry.length == 0) { whereInd = {} }
            else {
                var ind = []
                for (i = 0; i < industry.length; i++) {
                    ind.push({ IndustryName: { $like: '%' + industry[i] + '%' } })
                }
                whereInd = { $or: ind }
            }
            var wherejFunction
            if (jFuntion.length == 0) { wherejFunction = {} }
            else {
                var jf = []
                for (i = 0; i < jFuntion.length; i++) {
                    jf.push({ JobFunctionName: { $like: '%' + jFuntion[i] + '%' } })
                }
                wherejFunction = { $or: jf }
            }
            var wherejType
            if (jType.length == 0) { wherejType = {} }
            else {
                var jt = []
                for (i = 0; i < jType.length; i++) {
                    jt.push({ JobType: { $like: '%' + jType[i] + '%' } })
                }
                wherejType = { $or: jt }
            }
            Job.findAll({
                attributes: ['JobID', 'JobTitle', 'JobDescription', 'JobQualification', 'JobResponsibilities',
                    'JobPostDate', 'JobPostalCode', 'JobAddress'],
                include: [
                    {
                        model: model.Industry,
                        where: whereInd,
                        attributes: ['IndustryName'], through: { attributes: [] }
                    },
                    {
                        model: model.JobFunction,
                        where: wherejFunction,
                        attributes: ['JobFunctionName'], through: { attributes: [] }
                    },
                    {
                        model: model.JobType,
                        where: wherejType,
                        attributes: ['JobType']
                    },
                    { model: model.Company, attributes: ['CompanyName', 'CompanyAddress', 'CompanyPostalCode'] },
                    {
                        model: model.Salary,
                        attributes: ['SalaryFrom', 'SalaryTo'],
                        include: [{ model: model.Currency, attributes: ['Symbol', 'CurrencyCode'] }]
                    },
                    { model: model.Country, attributes: ['CountryName'] }]
            })
                .then(function (data) {
                    resolve(JSON.stringify(data))
                })
        })
    },
    addJob: function (salary, job, indID, jfID) {
        return new Promise(function (resolve, reject) {
            model.Salary.create(salary).then(function (newSalary) {
                var SalaryID = newSalary.SalaryID;
                job["SalaryID"] = SalaryID
                Job.create(job).then(function (newJob) {
                    indID.forEach(function (currentId) {
                        newJob.addIndustry(currentId).then(function (result) { })
                    });
                    jfID.forEach(function (currentID) {
                        newJob.addJobFunction(currentID).then(function (result) { })
                    })
                    resolve(JSON.stringify(newJob))
                }).catch(function (error) {
                    console.log("Error: " + error)
                    reject(error)
                })
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error)
            })
        })
    }
}
