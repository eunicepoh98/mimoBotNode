var wit = module.exports = {};

var witConfig = require('../config').wit;
const { Wit, log } = require('node-wit');

var serverToken = witConfig.serverToken;
var sessionResult = {};

wit.api = {
    NLP: function (sessionId, userMsg, prevContext) {
        return new Promise((resolve, reject) => {
            client.runActions(sessionId, userMsg, prevContext)
                .then((context1) => {
                    var result = sessionResult[sessionId];
                    //console.log(result);
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
        var data = { //entities from wit 
            industry_type:
            [{
                confidence: 0.926022391210834,
                type: 'value',
                value: 'Aerospace'
            },
            {
                confidence: 0.9253284478512049,
                type: 'value',
                value: 'Entertainment'
            }]
        }
        data['industry_type'].forEach(function (one) {
            console.log(one.value);
        })
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
                    //get industry list from db here
                    context.suggestionList = [{ industryList: getIndustryFromDB() }];
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
            //get list of job function from db here
            context.suggestionList = [{ jobFunctionList: getJobFunctionFromDB() }];
        } else {
            var industries = getEntityValues(entities, 'industry_type');
            if (industries) {
                //get list of job function from db here
                context.suggestionList = [{ jobFunctionList: getJobFunctionFromDB() }];
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
            //get list of job type from db here
            context.suggestionList = [{ jobTypeList: getJobTypeFromDB() }];
        } else {
            var JobFunctions = getEntityValues(entities, 'job_function');
            if (JobFunctions) {
                //get list of job type from db here
                context.suggestionList = [{ jobTypeList: getJobTypeFromDB() }];
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
        // var short_replies = firstEntityValue(entities, 'short_replies');
        // if (short_replies == 'ok') {
        //Query the database here
        context.suggestionList = [{ jobList: ['list of jobs based on users criteria'] }]; //list of jobs based on users criteria
        delete context.industryType;
        delete context.jobFunction;
        delete context.jobType;
        delete context.searchJob;
        return context;
        // } else {
        // }
    }
}
const firstEntityValue = (entities, entity) => {
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
const getEntityValues = (entities, entity) => {
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
function getIndustryFromDB() {
    return ['list of industry from db'];
}
function getJobFunctionFromDB() {
    return ['list of job function from db'];
}
function getJobTypeFromDB() {
    return ['list of job type from db'];
}

const client = new Wit({ accessToken: serverToken, actions });