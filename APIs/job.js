var job = module.exports = {};
var Job = require('../models').Job;
var model = require('../models');

job.api = {

    getAllJob: function () {
        return new Promise((resolve, reject) => {
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
            })
                .then((data) => {
                    resolve(data)
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
            Job.findAll({
                where: {
                    $or: [
                        //Please work
                        //http://docs.sequelizejs.com/manual/tutorial/models-usage.html#including-everything
                        //
                        // {
                        //     include: [
                        //         {
                        //             model: model.Industry,
                        //             where: {
                        //                 IndustryName: { $like: '%Aerospace%' }
                        //             }
                        //         }
                        //     ]
                        // }
                        //     ,
                        // { JobTitle: { $like: '%aerospace%' } },
                        // { JobDescription: { $like: '%aerospace%' } },
                        // { JobQualification: { $like: '%aerospace%' } },
                        // { JobResponsibilities: { $like: '%aerospace%' } }

                    ]
                    //Sequelize.col('project.state')
                },
                attributes: ['JobID', 'JobTitle', 'JobDescription', 'JobQualification', 'JobResponsibilities',
                    'JobPostDate', 'JobPostalCode', 'JobAddress'],
                include: [
                    {
                        model: model.Industry,
                        attributes: ['IndustryName'], through: { attributes: [] }
                        // ,
                        // where: {
                        //     $or: [
                        //         { IndustryName: { $like: '%Aerospace%' } }
                        //     ]
                        // }
                    },
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
                    resolve(data)
                })
        })
    }
}