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
                    //console.log('The session state is now for ' + sessionId + ': ' + JSON.stringify(context1));
                    var res = {
                        "botMessage": result.response.text,
                        "context": result.request.context
                    }
                    resolve(res);
                })
        })
    }
}

const actions = {
    send(request, response) {
        const { sessionId, context, entities } = request;
        const { text, quickreplies } = response;
        sessionResult[sessionId] = { "response": response, "request": request };
    }
    // ,
    // ['getSecondNumber']({ context, entities }) {
    //     const secondNumber = firstEntityValue(entities, 'number');
    //     if (secondNumber) {
    //         context.operation = context['operation'];
    //         context.firstNumber = context['firstNumber'];
    //         context.secondNumber = secondNumber;
    //         delete context.missingSecondNumber;
    //     } else {
    //         context.operation = context['operation'];
    //         context.firstNumber = context['firstNumber'];
    //         context.missingSecondNumber = true;
    //     }
    //     return context;
    // }
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
const client = new Wit({ accessToken: serverToken, actions });