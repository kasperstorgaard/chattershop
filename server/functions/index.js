'use strict';

const functions = require('firebase-functions'); // Cloud Functions for Firebase library
const DialogflowApp = require('actions-on-google').DialogflowApp; // Google Assistant helper library

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  if (request.body.queryResult) {
    processRequest(request, response);
  } else {
    console.log('Invalid Request');
    return response.status(400)
      .end('Invalid Webhook Request (v2 webhook request)');
  }
});

// Function to send correctly formatted responses to Dialogflow which are then sent to the user
function sendResponse (response, payload) {
  // if the response is a string send it as a response to the user
  if (typeof payload === 'string') {
    return response.json({fulfillmentText: payload}); // Send response to Dialogflow
  } else {
    // If the response to the user includes rich responses or contexts send them to Dialogflow
    const responseJson = {
      fulfillmentText: payload.fulfillmentText,
      fulfillmentMessages: payload.fulfillmentMessages || undefined,
      outputContexts: payload.outputContexts || undefined
    };

    // Send the response to Dialogflow
    console.log('Response to Dialogflow: ' + JSON.stringify(responseJson));
    response.json(responseJson);
  }
}

function handleAction (type, response) {
  const respond = (msg) => sendResponse(response, msg);

  switch (type) {
    // The default welcome intent has been matched, welcome the user
    // (https://dialogflow.com/docs/events#default_welcome_intent)
    // Send simple response to user
    case 'input.welcome': return respond('Hello, Welcome to my Dialogflow agent!');

    // The default fallback intent has been matched, try to recover 
    // (https://dialogflow.com/docs/intents#fallback_intents)
    // Use the Actions on Google lib to respond to Google requests; for other requests use JSON
    case 'input.unknown': return respond('I\'m having trouble, can you try that again?');

    //fulfillmentMessages: richResponsesV2, // Optional, uncomment to enable
    //outputContexts: [{ 'name': `${session}/contexts/weather`, 'lifespanCount': 2, 'parameters': {'city': 'Rome'} }], // Optional, uncomment to enable
    default: return respond({
      fulfillmentText: 'This is from Dialogflow\'s Cloud Functions for Firebase editor! :-)'
    });
  }
}

function processRequest (request, response) {
  // An action is a string used to identify what needs to be done in fulfillment
  const {action} = request.body.queryResult;

  // Parameters are any entites that Dialogflow has extracted from the request.
  const parameters = request.body.queryResult.parameters || {}; // https://dialogflow.com/docs/actions-and-parameters

  // Contexts are objects used to track and store conversation state
  const inputContexts = request.body.queryResult.contexts; // https://dialogflow.com/docs/contexts

  // Get the request source (Google Assistant, Slack, API, etc)
  const requestSource = request.body.originalDetectIntentRequest ?
    request.body.originalDetectIntentRequest.source : undefined;

  // Get the session ID to differentiate calls from different users
  const session = request.body.session || undefined;
  
  handleAction(action, response);
}

const cardResponse = {
  'title': 'Title: this is a title',
  'subtitle': 'This is an subtitle.  Text can include unicode characters including emoji 📱.',
  'imageUri': 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  'buttons': [
    {
      'text': 'This is a button',
      'postback': 'https://assistant.google.com/'
    }
  ]
};

const responses = [
  {
    'platform': 'ACTIONS_ON_GOOGLE',
    'simple_responses': {
      'simple_responses': [
        {
          'text_to_speech': 'Spoken simple response',
          'display_text': 'Displayed simple response'
        }
      ]
    }
  },
  {
    'platform': 'ACTIONS_ON_GOOGLE',
    'basic_card': {
      'title': 'Title: this is a title',
      'subtitle': 'This is an subtitle.',
      'formatted_text': 'Body text can include unicode characters including emoji 📱.',
      'image': {
        'image_uri': 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png'
      },
      'buttons': [
        {
          'title': 'This is a button',
          'open_uri_action': {
            'uri': 'https://assistant.google.com/'
          }
        }
      ]
    }
  },
  {
    'platform': 'FACEBOOK',
    'card': cardResponse
  },
  {
    'platform': 'SLACK',
    'card': cardResponse
  }
];
