var usersearch = module.exports = {};
var UserSearch = require('../Models').UserSearch;

/**
 * Add WorkExperience information into the database
 * @param {string} usersearch - JSON format of the usersearch details
 * {
      "JobTypeList": [],
      "JobFunctionList": ["Engineering"],
      "IndustryList": ["Aerospace"]
    }
 * @returns {string} JSON format of the added usersearch
 */
usersearch.addUserSearch = function (usersearch) {
    return new Promise(function (resolve, reject) {
        UserSearch.create(usersearch)
            .then(function (newUserSearch) {
                resolve(newUserSearch)
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    });
}

usersearch.getUserSearch = function (userid) {
    return new Promise(function (resolve, reject) {
        UserSearch.findAll({
            where: { UserID: userid, RecordStatus: { $not: 'D' } }
        }).then(function (data) {
            var jobfunctionlist = [], jobtypelist = [], industrylist = [];
            data.forEach(onesearch => {
                JSON.parse(onesearch.JobFunctionList).forEach(onefunction => {
                    if (!jobfunctionlist.includes(onefunction)) { jobfunctionlist.push(onefunction); }
                });
                JSON.parse(onesearch.JobTypeList).forEach(onetype => {
                    if (!jobtypelist.includes(onetype)) { jobtypelist.push(onetype); }
                });
                JSON.parse(onesearch.IndustryList).forEach(oneindustry => {
                    if (!industrylist.includes(oneindustry)) { industrylist.push(oneindustry); }
                });
            })
            var result = { IndustryList: industrylist, JobFunctionList: jobfunctionlist, JobTypeList: jobtypelist }
            resolve(result)
        }).catch(function (error) {
            console.log("Error: " + error)
            reject(error.toString());
        });
    });
}