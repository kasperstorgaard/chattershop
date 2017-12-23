const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.getItems = function() {
  itemsRef = admin.database().ref('items');

  return itemsRef.limitToLast(10).once('value')
    .then(snapshot => {
      let items = [];

      snapshot.forEach(childSnapshot => {
        const key = childSnapshot.key;
        const data = childSnapshot.val();
        items.push({key, data});
      });

      return items;
    });
}