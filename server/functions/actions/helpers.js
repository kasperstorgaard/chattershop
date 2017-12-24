exports.generateCard = function(data) {
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

