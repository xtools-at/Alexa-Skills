'use strict';

module.exports = app => {

  const onUtterances = [
    'hallo',
    'an',
    'ein',
    'einschalten',
    'licht',
    'mach licht'
  ];

  app.intent('OnIntent', onUtterances, () => {
    var baseUrl = 'https://s3.eu-central-1.amazonaws.com/assetsalexa/nachtlicht/';

    var audio = `<audio src="${baseUrl + 's01min.mp3'}" />`;
    audio += `<audio src="${baseUrl + 's16s.mp3'}" />`;
    audio += `<audio src="${baseUrl + 's08s.mp3'}" />`;

    var ssml = `<speak>${audio}</speak>`;

    return {
      ssml: true,
      text: ssml
    };
  });

};
