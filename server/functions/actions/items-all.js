const db = require('../db');
const {generateCard} = require('./helpers');

exports.get = function(params) {
  const itemsResponse = db.getItems();

  return itemsResponse.then(items => {

    const messages = items.map(item => ({
      platform: 'ACTIONS_ON_GOOGLE',
      basic_card: generateCard(item.data)
    }));

    const text = messages.length ? `Here's all the items I found: ` :
      `I'm sorry, I couldn't find anything for you.`

    return {
      fulfillmentText: text,
      fulfillmentMessages: messages
    };
  });
}