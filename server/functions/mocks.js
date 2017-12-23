exports.cardResponse = {
  'title': 'Title: this is a title',
  'subtitle': 'This is an subtitle.  Text can include unicode characters including emoji 📱.',
  'imageUri': 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  'buttons': [{
    'text': 'This is a button',
    'postback': 'https://assistant.google.com/'
  }]
};

exports.responses = [{
  'platform': 'ACTIONS_ON_GOOGLE',
  'simple_responses': {
    'simple_responses': [{
      'text_to_speech': 'Spoken simple response',
      'display_text': 'Displayed simple response'
    }]
  }
}, {
  'platform': 'ACTIONS_ON_GOOGLE',
  'basic_card': {
    'title': 'Title: this is a title',
    'subtitle': 'This is an subtitle.',
    'formatted_text': 'Body text can include unicode characters including emoji 📱.',
    'image': {
      'image_uri': 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png'
    },
    'buttons': [{
      'title': 'This is a button',
      'open_uri_action': {
        'uri': 'https://assistant.google.com/'
      }
    }]
  }
}, {
  'platform': 'FACEBOOK',
  'card': cardResponse
}, {
  'platform': 'SLACK',
  'card': cardResponse
}];