var wit = module.exports = {};

var path = require('path');
var jobfunction = require(path.resolve('./APIs/jobfunction.js'));
var industry = require(path.resolve('./APIs/industry.js'));
var jobtype = require(path.resolve('./APIs/jobtype.js'));
var job = require(path.resolve('./APIs/job.js'));
var usersearch = require(path.resolve('./APIs/usersearch.js'));
var workexperience = require(path.resolve('./APIs/workexperience.js'));

var witConfig = require('../config').wit;
const { Wit, log } = require('node-wit');

var serverToken = witConfig.serverToken;
var sessionResult = {};

var industryList = [], jobfunctionList = [], jobtypeList = [];
// loads Job Type, Job Function and Industry data from the database

industry.getAllIndustrySynonyms().then(function (data) {
    industryList = data;
});
jobfunction.getAllJobFunctionSynonyms().then(function (data) {
    jobfunctionList = data;
});
jobtype.getAllJobTypeSynonyms().then(function (data) {
    jobtypeList = data;
});

/**
 * Process user message and return the bot next action
 * @param {int} sessionId - sessionId of the conversation
 * @param {string} userMsg - What the user say
 * @param {string} prevContext - wit Context 
 * @returns {string} JSON format containing the bot message and wit context
 */
wit.NLP = function (sessionId, userMsg, prevContext, userid) {
    return new Promise(function (resolve, reject) {
        if (userMsg == "") { userMsg = " "; }
        prevContext.userid = userid;
        client.runActions(sessionId, userMsg, prevContext)
            .then(function (context1) {
                var result = sessionResult[sessionId];
                delete sessionResult[sessionId];
                var res = {
                    "botMessage": result.response.text,
                    "context": result.request.context
                };
                resolve(res);
            }).catch(function (error) {
                reject(error.toString());
            });
    });
};

const actions = {
    send(request, response) {
        const { sessionId, context, userText, entities } = request;
        const { botText, quickreplies } = response;
        sessionResult[sessionId] = { "response": response, "request": request };
    },
    ['getIntention']({ context, entities }) {
        context.userid = context.userid;
        const intent = firstEntityValue(entities, 'intent');
        if (intent) {
            if (intent == "add work experience") {
                context.addWorkExperience = intent;
                context.action = { action: false };
            } else if (intent == "search job") {
                context.action = { action: true, name: 'displaySuggestion', data: industryList }; //industry list from db 
                context.searchJob = intent;
            }
            delete context.missingIntent;
        } else {
            context.missingIntent = true;
        }
        return context;
    },
    //Search Job Methods
    ['getIndustry']({ context, entities }) {
        context.userid = context.userid;
        context.searchJob = context['searchJob'];
        var short_replies = firstEntityValue(entities, 'short_replies');
        context.action = { action: true, name: 'displaySuggestion', data: jobfunctionList }; //list of job function from db
        if (short_replies == 'no') {
            context.industryType = [];
        } else {
            var industries = getEntityValues(entities, 'industry_type');
            if (industries) {
                context.industryType = industries;
                delete context.missingIndustryType;
            } else {
                context.missingIndustryType = true;
            }
        }
        return context;
    },
    ['getJobFunction']({ context, entities }) {
        context.userid = context.userid;
        context.searchJob = context['searchJob'];
        context.industryType = context['industryType'];
        var short_replies = firstEntityValue(entities, 'short_replies');
        context.action = { action: true, name: 'displaySuggestion', data: jobtypeList }; //list of job type from db
        if (short_replies == 'no') {
            context.jobFunction = [];
        } else {
            var JobFunctions = getEntityValues(entities, 'job_function');
            if (JobFunctions) {
                context.jobFunction = JobFunctions;
                delete context.missingJobFunction;
            } else {
                context.missingJobFunction = true;
                delete context.jobFunction;
            }
        }
        return context;
    },
    ['getJobType']({ context, entities }) {
        context.userid = context.userid;
        context.searchJob = context['searchJob'];
        context.industryType = context['industryType'];
        context.jobFunction = context['jobFunction'];
        var short_replies = firstEntityValue(entities, 'short_replies');
        context.action = { action: false };
        if (short_replies == 'no') {
            context.jobType = [];
        } else {
            var JobTypes = getEntityValues(entities, 'job_type');
            if (JobTypes) {
                context.jobType = JobTypes;
                delete context.missingJobType;
            } else {
                context.missingJobType = true;
            }
        }
        return context;
    },
    ['getJobs']({ context, entities }) {
        var userid = context.userid;
        var jobType = context['jobType'];
        var industryType = context['industryType'];
        var jobFunction = context['jobFunction'];
        context.action = { action: true, name: "resetID" };

        //add user search data into database
        usersearch.addUserSearch({
            JobTypeList: JSON.stringify(jobType), JobFunctionList: JSON.stringify(jobFunction),
            IndustryList: JSON.stringify(industryType), UserID: userid
        })
            .then(function (result) { console.log("Usersearch created: " + result); })
            .catch(function (error) { console.log(error); });

        //get filtered job based on user search criteria
        job.getUserJob(industryType, jobFunction, jobType, userid).then(function (result) {
            delete context.industryType;
            delete context.jobFunction;
            delete context.jobType;
            delete context.searchJob;
            delete context.suggestionList;
            context.result = [{ jobList: JSON.parse(result) }]; //list of jobs based on users criteria
        });
        return context;
    },
    //Add Work Experience Methods
    ['getCompanyName']({ context, entities, text }) {
        context.userid = context.userid;
        context.addWorkExperience = context['addWorkExperience'];
        context.action = { action: false };
        if (text.length < 2) {
            context.missingCompanyName = true;
        } else {
            context.companyName = text;
            delete context.missingCompanyName;
        }
        return context;
    },
    ['getWorkAs']({ context, entities, text }) {
        context.userid = context.userid;
        context.addWorkExperience = context['addWorkExperience'];
        context.companyName = context['companyName'];
        context.action = { action: false };
        if (text.length < 2) {
            context.missingWorkAs = true;
        } else {
            context.workAs = text;
            delete context.missingWorkAs;
        }
        return context;
    },
    ['haveDescription']({ context, entities, text }) {
        context.userid = context.userid;
        var short_replies = firstEntityValue(entities, 'short_replies');
        context.addWorkExperience = context['addWorkExperience'];
        context.companyName = context['companyName'];
        context.workAs = context['workAs'];
        context.action = { action: false };
        if (short_replies) {
            delete context.missingHaveDescription;
            if (short_replies == "no") {
                context.description = "";
                context.action = { action: true, name: "displayDatePicker" };
            } else if (short_replies == "yes") {
                context.missingDescription = true;
            }
        } else {
            context.missingHaveDescription = true;
        }
        return context;
    },
    ['getDescription']({ context, entities, text }) {
        context.userid = context.userid;
        context.addWorkExperience = context['addWorkExperience'];
        context.companyName = context['companyName'];
        context.workAs = context['workAs'];
        if (text.length < 2) {
            context.action = { action: false };
            context.missingHaveDescription = true;
        } else {
            context.action = { action: true, name: "displayDatePicker" };
            context.description = text;
            delete context.missingDescription;
        }
        return context;
    },
    ['getStartDay']({ context, entities, text }) {
        context.userid = context.userid;
        var startDay = firstEntityValue(entities, 'datetime');
        context.addWorkExperience = context['addWorkExperience'];
        context.companyName = context['companyName'];
        context.workAs = context['workAs'];
        context.description = context['description'];
        context.action = { action: false };
        if (startDay) {
            context.startDay = startDay;
            delete context.missingStartDay;
        } else {
            context.action = { action: true, name: "displayDatePicker" };
            context.missingStartDay = true;
        }
        return context;
    },
    ['currentJob']({ context, entities }) {
        context.userid = context.userid;
        var short_replies = firstEntityValue(entities, 'short_replies');
        context.addWorkExperience = context['addWorkExperience'];
        context.companyName = context['companyName'];
        context.workAs = context['workAs'];
        context.description = context['description'];
        context.startDay = context['startDay'];
        if (context['endDay']) {
            context.endDay = context['endDay'];
        } else {
            if (short_replies) {
                delete context.missingCurrentJob;
                if (short_replies == "no") {
                    context.missingEndDay = true;
                    context.action = { action: true, name: "displayFilterDatePicker" };
                } else if (short_replies == "yes") {
                    delete context.missingEndDay;
                    context.endDay = "null";
                    context.action = { action: true, name: "resetID" };
                } else {
                    context.missingCurrentJob = true;
                    context.action = { action: false };
                }
            } else {
                context.missingCurrentJob = true;
                context.action = { action: false };
            }
        }
        return context;
    },
    ['getEndDay']({ context, entities, text }) {
        context.userid = context.userid;
        var endDay = firstEntityValue(entities, 'datetime');
        context.addWorkExperience = context['addWorkExperience'];
        context.companyName = context['companyName'];
        context.workAs = context['workAs'];
        context.description = context['description'];
        context.startDay = context['startDay'];
        context.action = { action: false };
        if (endDay) {
            context.endDay = endDay;
            delete context.missingEndDay;
        } else {
            context.missingEndDay = true;
        }
        return context;
    },
    ['addWorkExperience']({ context }) {
        var userid = context.userid;
        var companyName = context['companyName'];
        var workAs = context['workAs'];
        var description = context['description'];
        var startDay = context['startDay'];
        var endDay = context['endDay'];
        console.log(userid, companyName, workAs, description, startDay, endDay);
        //add to workexperience to database
        workexperience.addWorkExperience({
            CompanyName: companyName, Role: workAs, Description: description, StartDate: startDay, EndDate: endDay, UserID: userid
        }).then(function (result) {
            context.action = { action: true, name: "resetID" };
        }).catch(function (error) { });
        return context;
        //loops here
    }
}

/**
 * Extract the value of a certain entity from a list of entities
 * @param {string} entities - JSON format of entities from wit
 * @param {string} entity - the name of the value to extract from entities
 * @returns {null|string} null if entity to extract not present | value of entity extracted from entities
 */
const firstEntityValue = function (entities, entity) {
    const val = entities && entities[entity] &&
        Array.isArray(entities[entity]) &&
        entities[entity].length > 0 &&
        entities[entity][0].value
        ;
    if (!val) { return null; }
    return typeof val === 'object' ? val.value : val;
};

/**
 * Extract the values of a certain entity from a list of entities
 * @param {string} entities - JSON format of entities from wit
 * @param {string} entity - the name of the value to extract from entities
 * @returns {null|array} null if entity to extract not present | array of values of entity extracted from entities
 */
const getEntityValues = function (entities, entity) {
    var entityArray = [];
    const val = entities && entities[entity] &&
        Array.isArray(entities[entity]) &&
        entities[entity].length > 0 &&
        entities[entity][0].value;
    if (!val) { return null; }
    else {
        entities[entity].forEach(function (one) {
            entityArray.push(one.value);
        });
        return entityArray;
    }
}

const client = new Wit({ accessToken: serverToken, actions });