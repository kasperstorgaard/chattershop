const db = require('../db');

function generateCard(title, description) {
  return {

  }
}

function generateCard(data) {
  return {
    title: data.name,
    subtitle: 'This is just a sample subtitle',
    formatted_text: 'Body text can include unicode characters including emoji 📱.',
    image: {
      image_uri: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png'
    },
    buttons: [{
      'title': 'This is a button',
      'open_uri_action': {'uri': 'https://assistant.google.com/'}
    }]
  };
}

exports.getResponse = function() {
  const itemsResponse = db.getItems()

  return itemsResponse.then(items => {

    const messages = items.map(item => ({
      platform: 'ACTIONS_ON_GOOGLE',
      basic_card: generateCard(item.data)
    }));

    return {
      fulfillmentText: `Here's what I Found: `,
      fulfillmentMessages: messages
    };
  });
}