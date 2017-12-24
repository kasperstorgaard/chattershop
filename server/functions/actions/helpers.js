exports.generateCard = function(data) {
  return {
    title: data.name,
    subtitle: 'This is just a sample subtitle',
    formatted_text: data.description,
    image: {
      image_uri: data.image
    },
    buttons: [{
      'title': 'This is a button',
      'open_uri_action': {'uri': 'https://assistant.google.com/'}
    }]
  };
}

