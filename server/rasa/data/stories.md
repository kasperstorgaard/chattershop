## story_00914561
* greet
 - utter_ask_howcanhelp
* inform{"category": "gadgets"}
 - utter_on_it
 - utter_ask_price
* inform{"price": "cheap"}
 - utter_ack_dosearch
 - action_search_items
* thankyou
 - utter_ask_helpmore

## story_03812903
* greet
 - utter_ask_howcanhelp
* inform{"item": "jacket", "category": "clothes"}
 - utter_on_it
 - utter_ask_price
* inform{"price": "expensive"}
 - utter_ack_dosearch
 - action_search_items
 - action_suggest
* deny
 - utter_ack_findalternatives
 - action_suggest
* deny
 - utter_ack_findalternatives
 - action_suggest