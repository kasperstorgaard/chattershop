const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
const itemsRef = admin.database().ref('items');

function unwrap(snapshot) {
    let items = [];

    snapshot.forEach(snapshot => {
      const key = snapshot.key;
      const data = snapshot.val();
      items.push({key, data});
    });

    return items;
}

exports.getItems = function() {
  return itemsRef
    .limitToLast(10)
    .once('value')
    .then(unwrap);
}

exports.getItemsBy = function(type, value) {
  return itemsRef
    .orderByChild(type)
    .equalTo(value)
    .once('value')
    .then(unwrap);
}