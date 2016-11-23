'use strict';

module.exports = app => {

  const minUtterances = [
    '{num:Number} minutes',
    'for {num:Number} minutes',
    'on for {num:Number} minutes',
    'switch on lights for {num:Number} minutes',
    'switch on the light for {num:Number} minutes',
    'turn on lights for {num:Number} minutes',
    'turn on the light for {num:Number} minutes',
    'to switch on lights for {num:Number} minutes',
    'to switch on the light for {num:Number} minutes',
    'to turn on lights for {num:Number} minutes',
    'to turn on the light for {num:Number} minutes',
    'switch lights on for {num:Number} minutes',
    'turn lights on for {num:Number} minutes',
    'turn the light on for {num:Number} minutes',
    'to switch lights on for {num:Number} minutes',
    'to switch the light on for {num:Number} minutes',
    'to turn lights on for {num:Number} minutes',
    'to turn the light on for {num:Number} minutes',
    '{num:Number} minute',
    'for {num:Number} minute',
    'on for {num:Number} minute',
    'switch on lights for {num:Number} minute',
    'switch on the light for {num:Number} minute',
    'turn on lights for {num:Number} minute',
    'turn on the light for {num:Number} minute',
    'to switch on lights for {num:Number} minute',
    'to switch on the light for {num:Number} minute',
    'to turn on lights for {num:Number} minute',
    'to turn on the light for {num:Number} minute',
    'switch lights on for {num:Number} minute',
    'turn lights on for {num:Number} minute',
    'turn the light on for {num:Number} minute',
    'to switch lights on for {num:Number} minute',
    'to switch the light on for {num:Number} minute',
    'to turn lights on for {num:Number} minute',
    'to turn the light on for {num:Number} minute'
  ];

  app.intent('MinutesIntent', minUtterances, (slots) => {
    if (!slots.num) {
      return {
        text: 'Once again please',
        end: false
      };
    } else {
      var baseUrl = 'https://s3.eu-central-1.amazonaws.com/assetsalexa/nachtlicht/';
      var num = slots.num;
      var audio = '';

      if (num > 0 && num <= 1) {
        audio = `<audio src="${baseUrl + 's01min.mp3'}" />`;
      } else if (num > 1) {
        audio = `<audio src="${baseUrl + 's01min.mp3'}" />`;
        audio += `<audio src="${baseUrl + 's16s.mp3'}" />`;
        audio += `<audio src="${baseUrl + 's08s.mp3'}" />`;
      }

      return {
        ssml: true,
        text: `<speak>${audio}</speak>`
      };
    }

  });

};
