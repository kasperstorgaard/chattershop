'use strict';

const functions = require('firebase-functions'); // Cloud Functions for Firebase library
const {itemsSearch} = require('./actions/index');

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  if (!request.body.queryResult) {
    console.log('Invalid Request');

    return response
      .status(400)
      .end('Invalid Webhook Request');
  }

  return processRequest(request, response);
});

function sendResponse(response, payload) {
  if (typeof payload === 'string') {
    return response.json({fulfillmentText: payload});
  } else {
    return response.json(payload);
  }
}

function processRequest(request, response) {
  const {action} = request.body.queryResult;

  const responseData = Promise.resolve(getResponseData(action));
  return responseData.then(data => sendResponse(response, data));
}

function getResponseData(action) {
  switch (action) {
    case 'input.welcome': return 'Hello, Welcome to my Dialogflow agent!';
    case 'input.unknown': return `I'm having trouble, can you try that again?`;
    case 'items.search': return itemsSearch.getResponse()

    default: return {
      fulfillmentText: 'This is from Dialogflow\'s Cloud Functions for Firebase editor! :-)'
    };
  }
}
