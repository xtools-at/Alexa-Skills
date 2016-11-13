/**
 * Quirky implementation of a Nightlight :)
*/
module.exports = app => {

  const secUtterances = [
    'ein fuer {num:Number} Sekunden',
    'an fuer {num:Number} Sekunden',
    'einschalten fuer {num:Number} Sekunden',
    'fuer {num:Number} Sekunden einschalten',
    'fuer {num:Number} Sekunden ein',
    'schalte fuer {num:Number} Sekunden ein',
    'fuer {num:Number} Sekunden an',
    '{num:Number} Sekunden einschalten',
    '{num:Number} Sekunden ein',
    'schalte {num:Number} Sekunden ein',
    '{num:Number} Sekunden an'
  ];

  app.intent('SecondsIntent', secUtterances, (slots, attrs, data) => {
    return {
      text: 'It works',
      end: false
    };
    /*
    if (!slots.num) {
      return {
        text: 'Nochmals bitte',
        end: false
      };
    } else {
      var baseUrl = 'https://s3.eu-central-1.amazonaws.com/assetsalexa/nachtlicht/';
      var num = slots.num;
      var audio = '';

      console.log('debug 1: ', num, num > 0);

      if (num > 0 && num <= 2) {
        audio = `<audio src="${baseUrl + 's0' + num + 's.mp3'}" />`;
      } else if (num > 2 && num <= 4) {
        audio = `<audio src="${baseUrl + 's04s.mp3'}" />`;
      } else if (num > 4 && num <= 6) {
        audio = `<audio src="${baseUrl + 's04s.mp3'}" />`;
        audio += `<audio src="${baseUrl + 's02s.mp3'}" />`;
      } else if (num > 6 && num <= 11) {
        audio = `<audio src="${baseUrl + 's08s.mp3'}" />`;
        audio += `<audio src="${baseUrl + 's02s.mp3'}" />`;
      } else if (num > 11 && num <= 13) {
        audio = `<audio src="${baseUrl + 's08s.mp3'}" />`;
        audio = `<audio src="${baseUrl + 's04s.mp3'}" />`;
      } else if (num > 13 && num <= 18) {
        audio = `<audio src="${baseUrl + 's16s.mp3'}" />`;
      } else if (num > 18 && num <= 24) {
        audio = `<audio src="${baseUrl + 's16s.mp3'}" />`;
        audio += `<audio src="${baseUrl + 's04s.mp3'}" />`;
      } else if (num > 24 && num <= 36) {
        audio = `<audio src="${baseUrl + 's32s.mp3'}" />`;
      } else if (num > 36 && num <= 44) {
        audio = `<audio src="${baseUrl + 's32s.mp3'}" />`;
        audio += `<audio src="${baseUrl + 's08s.mp3'}" />`;
      } else if (num > 44 && num <= 52) {
        audio = `<audio src="${baseUrl + 's32s.mp3'}" />`;
        audio += `<audio src="${baseUrl + 's16s.mp3'}" />`;
      } else if (num > 52 && num <= 61) {
        audio = `<audio src="${baseUrl + 's01min.mp3'}" />`;
      } else if (num > 61 && num <= 78) {
        audio = `<audio src="${baseUrl + 's01min.mp3'}" />`;
        audio += `<audio src="${baseUrl + 's16s.mp3'}" />`;
      } else if (num > 78) {
        audio = `<audio src="${baseUrl + 's01min.mp3'}" />`;
        audio += `<audio src="${baseUrl + 's16s.mp3'}" />`;
        audio += `<audio src="${baseUrl + 's08s.mp3'}" />`;
      }

      console.log('debug 3: ', audio);
      var ssml = `<speak>${audio}</speak>`;
      console.log('debug 4: ', ssml);

      return {
        ssml: true,
        text: ssml
      };
    }
   */ 
  });
};
