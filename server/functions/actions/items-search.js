const db = require('../db');
const {generateCard} = require('./helpers');

exports.get = function(params) {
  const category = (params.category || [])[0];

  if (!category) {
    return {
      fulfillmentText: `Sorry, Looks like we cant find any category matching that`
    };
  }

  const itemsResponse = db.getItemsBy('category', category);

  return itemsResponse.then(items => {

    const messages = items.map(item => ({
      platform: 'ACTIONS_ON_GOOGLE',
      basic_card: generateCard(item.data)
    }));

    const text = messages.length ? `Here's all the ${category} items I could find: ` :
      `I'm sorry, I couldn't find any ${category} items for you.`

    return {
      fulfillmentText: text,
      fulfillmentMessages: messages
    };
  });
}