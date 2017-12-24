'use strict';

const functions = require('firebase-functions'); // Cloud Functions for Firebase library
const actions = require('./actions/index');

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
  if (!payload) {
    return response.status(400)
      .end('No Matching Action Response Found');
  }

  if (typeof payload === 'string') {
    return response.json({fulfillmentText: payload});
  }

  return response.json(payload);
}

function processRequest(request, response) {
  const {action, parameters} = request.body.queryResult;

  const responseData = Promise.resolve(getResponseData(action, parameters));
  return responseData.then(data => sendResponse(response, data));
}

function getResponseData(action, params) {
  switch (action) {
    case 'items.all': return actions.itemsAll.get()
    case 'items.search': return actions.itemsSearch.get(params)
    default: return undefined;
  }
}
