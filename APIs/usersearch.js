var usersearch = module.exports = {};
var UserSearch = require('../Models').UserSearch;

/**
 * Add UserSearch into the database
 * @param {string} usersearch - JSON format of the usersearch details
 * {
      "JobTypeList": [],
      "JobFunctionList": ["Engineering"],
      "IndustryList": ["Aerospace"],
      "UserID": 1
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

function isJson(str) {
    if (str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
}

usersearch.getUserSearch = function (userid) {
    return new Promise(function (resolve, reject) {
        UserSearch.findAll({
            where: { UserID: userid, RecordStatus: { $not: 'D' } }
        }).then(function (data) {
            var jobfunctionlist = [], jobtypelist = [], industrylist = [];
            data.forEach(onesearch => {
                if (isJson(onesearch.JobTypeList)) {
                    JSON.parse(onesearch.JobTypeList).forEach(onetype => {
                        if (!jobtypelist.includes(onetype)) { jobtypelist.push(onetype); }
                    });
                }
                if (isJson(onesearch.JobFunctionList)) {
                    JSON.parse(onesearch.JobFunctionList).forEach(onefunction => {
                        if (!jobfunctionlist.includes(onefunction)) { jobfunctionlist.push(onefunction); }
                    });
                }
                if (isJson(onesearch.IndustryList)) {
                    JSON.parse(onesearch.IndustryList).forEach(oneindustry => {
                        if (!industrylist.includes(oneindustry)) { industrylist.push(oneindustry); }
                    });
                }
            })
            var result = { IndustryList: industrylist, JobFunctionList: jobfunctionlist, JobTypeList: jobtypelist }
            resolve(result)
        }).catch(function (error) {
            console.log("Error: " + error)
            reject(error.toString());
        });
    });
}