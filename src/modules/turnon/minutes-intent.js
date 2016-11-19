'use strict';

module.exports = app => {

  const minUtterances = [
    'Ein fuer {num:Number} Minuten',
    'An fuer {num:Number} Minuten',
    'Einschalten fuer {num:Number} Minuten',
    'fuer {num:Number} Minuten einschalten',
    'fuer {num:Number} Minuten ein',
    'schalte fuer {num:Number} Minuten ein',
    'fuer {num:Number} Minuten an',
    '{num:Number} Minuten einschalten',
    '{num:Number} Minuten ein',
    'schalte {num:Number} Minuten ein',
    '{num:Number} Minuten an',
    'Ein fuer {num:Number} Minute',
    'An fuer {num:Number} Minute',
    'Einschalten fuer {num:Number} Minute',
    'fuer {num:Number} Minute einschalten',
    'fuer {num:Number} Minute ein',
    'schalte fuer {num:Number} Minute ein',
    'fuer {num:Number} Minute an',
    '{num:Number} Minute einschalten',
    '{num:Number} Minute ein',
    'schalte {num:Number} Minute ein',
    '{num:Number} Minute an',
    '{num:Number} Minuten',
    'fuer {num:Number} Minuten',
    '{num:Number} Minute',
    'fuer {num:Number} Minute'
  ];

  app.intent('MinutesIntent', minUtterances, (slots) => {
    if (!slots.num) {
      return {
        text: 'Nochmals bitte',
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
