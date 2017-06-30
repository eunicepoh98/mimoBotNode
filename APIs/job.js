var job = module.exports = {};
var Job = require('../models').Job;
var model = require('../models');

job.api = {

    getAllJob: function () {
        return new Promise((resolve, reject) => {
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
                .then((data) => {
                    resolve(JSON.stringify(data))
                })
        })
    },
    getOneJob: function (id) {
        return new Promise((resolve, reject) => {
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
                .then((data) => {
                    resolve(data);
                })
        })
    },
    getFilteredJob: function () {
        return new Promise((resolve, reject) => {
            var industry = 'aerospace'
            var jFuntion = 'engineering'
            var jType = 'full time'
            Job.findAll({
                where: {
                    $or: [
                        {
                            $or:
                            [
                                { '$Industries.IndustryName$': { $like: '%' + industry + '%' } },//'%' + industry + '%' 
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
                .then((data) => {
                    resolve(data)
                })
        })
    },
    getUserJob: function (industry, jFuntion, jType) { //industry, jFuntion, jType
        // var industry = ["fishing"]
        // var jFuntion = []
        // var jType = []
        return new Promise((resolve, reject) => {
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
                .then((data) => {
                    resolve(JSON.stringify(data))
                })
        })
    }
}