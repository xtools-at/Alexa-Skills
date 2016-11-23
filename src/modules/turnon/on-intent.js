'use strict';

module.exports = app => {

  const onUtterances = [
    'hello',
    'on',
    'to turn on',
    'turn on',
    'to turn on the light',
    'turn on the light',
    'to turn on lights',
    'turn on lights',
    'to turn on the lights',
    'turn on the lights',
    'turn lights on',
    'to turn on lights',
    'to turn lights on',
    'to turn the lights on',
    'turn the lights on',
    'switch light',
    'switch light on',
    'switch on the light',
    'switch the light on',
    'to switch the light on',
    'switch lights',
    'switch lights on',
    'switch on lights',
    'switch on the lights',
    'switch the lights on',
    'to switch the lights on'
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
