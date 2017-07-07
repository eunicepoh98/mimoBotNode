var wit = module.exports = {};

var path = require('path');
var jobfunction = require(path.resolve('./APIs/jobfunction.js')).api;
var industry = require(path.resolve('./APIs/industry.js')).api;
var jobtype = require(path.resolve('./APIs/jobtype.js')).api;
var job = require(path.resolve('./APIs/job.js')).api;

var witConfig = require('../config').wit;
const { Wit, log } = require('node-wit');

var serverToken = witConfig.serverToken;
var sessionResult = {};

// loads data
var jobType, jobFunction, jobIndustry;
jobtype.getAllJobTypeName().then(function (data) {
    jobType = data;
})
industry.getAllIndustryName().then(function (data) {
    jobIndustry = data;
})
jobfunction.getAllJobFunctionName().then(function (data) {
    jobFunction = data;
})


wit.api = {
    NLP: function (sessionId, userMsg, prevContext) {
        return new Promise(function (resolve, reject) {
            client.runActions(sessionId, userMsg, prevContext)
                .then(function (context1) {
                    var result = sessionResult[sessionId];
                    delete sessionResult[sessionId];
                    var res = {
                        "botMessage": result.response.text,
                        "context": result.request.context
                    }
                    resolve(res);
                })
        })
    },
    test: function () {
        return new Promise(function (resolve, reject) {
            var industries = ['aerospace', '1', '2']
            var s = []
            for (i = 0; i < industries.length; i++) {
                s.push({ IndustryName: { $like: '%' + industries[i] + '%' } })
            }
            console.log(s)
            resolve(s)
        })

        //IndustryName: { $like: '%' + industry + '%' }
        // var data = { //entities from wit 
        //     industry_type:
        //     [{
        //         confidence: 0.926022391210834,
        //         type: 'value',
        //         value: 'Aerospace'
        //     },
        //     {
        //         confidence: 0.9253284478512049,
        //         type: 'value',
        //         value: 'Entertainment'
        //     }]
        // }
        // data['industry_type'].forEach(function (one) {
        //     console.log(one.value);
        // })
    }
}

const actions = {
    send(request, response) {
        const { sessionId, context, entities } = request;
        const { text, quickreplies } = response;
        sessionResult[sessionId] = { "response": response, "request": request };
    },
    ['getIntention']({ context, entities }) {
        const intent = firstEntityValue(entities, 'intent');
        if (intent) {
            switch (intent) {
                case "update work experience": {
                    context.updateWorkExperience = intent;
                    break;
                }
                case "search job": {
                    context.suggestionList = [{ industryList: jobIndustry }]; //industry list from db 
                    context.searchJob = intent;
                    break;
                }
            }
            delete context.missingIntent;
        } else {
            context.missingIntent = true;
        }
        return context;
    },
    ['getIndustry']({ context, entities }) {
        context.searchJob = context['searchJob'];
        var short_replies = firstEntityValue(entities, 'short_replies');
        if (short_replies == 'no') {
            context.industryType = [];
            context.suggestionList = [{ jobFunctionList: jobFunction }]; //list of job function from db
        } else {
            var industries = getEntityValues(entities, 'industry_type');
            if (industries) {
                context.suggestionList = [{ jobFunctionList: jobFunction }]; //list of job function from db
                context.industryType = industries;
                delete context.missingIndustryType;
            } else {
                context.missingIndustryType = true;
            }
        }
        return context;
    },
    ['getJobFunction']({ context, entities }) {
        context.searchJob = context['searchJob'];
        context.industryType = context['industryType'];
        var short_replies = firstEntityValue(entities, 'short_replies');
        if (short_replies == 'no') {
            context.jobFunction = [];
            context.suggestionList = [{ jobTypeList: jobType }]; //list of job type from db
        } else {
            var JobFunctions = getEntityValues(entities, 'job_function');
            if (JobFunctions) {
                context.suggestionList = [{ jobTypeList: jobType }]; //list of job type from db
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
        context.searchJob = context['searchJob'];
        context.industryType = context['industryType'];
        context.jobFunction = context['jobFunction'];
        var short_replies = firstEntityValue(entities, 'short_replies');
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
        var jobType = context['jobType'];
        var industryType = context['industryType'];
        var jobFunction = context['jobFunction'];
        console.log(jobType + " " + industryType + " " + jobFunction)
        job.getUserJob(industryType, jobFunction, jobType).then(function (result) {
            delete context.industryType;
            delete context.jobFunction;
            delete context.jobType;
            delete context.searchJob;
            delete context.suggestionList;
            context.result = [{ jobList: JSON.parse(result) }]; //list of jobs based on users criteria
        })
        return context;
    }
}
const firstEntityValue = function (entities, entity) {
    const val = entities && entities[entity] &&
        Array.isArray(entities[entity]) &&
        entities[entity].length > 0 &&
        entities[entity][0].value
        ;
    if (!val) {
        return null;
    }
    return typeof val === 'object' ? val.value : val;
};
const getEntityValues = function (entities, entity) {
    var entityArray = [];
    const val = entities && entities[entity] &&
        Array.isArray(entities[entity]) &&
        entities[entity].length > 0 &&
        entities[entity][0].value;
    if (!val) {
        return null;
    } else {
        entities[entity].forEach(function (one) {
            entityArray.push(one.value);
        })
        return entityArray;
    }
}
function getFilteredJobs() {
    return ['list of industry from db'];
}


const client = new Wit({ accessToken: serverToken, actions });