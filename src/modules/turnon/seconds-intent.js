'use strict';

module.exports = app => {

  const secUtterances = [
    '{num:Number} seconds',
    'for {num:Number} seconds',
    'on for {num:Number} seconds',
    'switch on lights for {num:Number} seconds',
    'switch on the light for {num:Number} seconds',
    'turn on lights for {num:Number} seconds',
    'turn on the light for {num:Number} seconds',
    'to switch on lights for {num:Number} seconds',
    'to switch on the light for {num:Number} seconds',
    'to turn on lights for {num:Number} seconds',
    'to turn on the light for {num:Number} seconds',
    'switch lights on for {num:Number} seconds',
    'turn lights on for {num:Number} seconds',
    'turn the light on for {num:Number} seconds',
    'to switch lights on for {num:Number} seconds',
    'to switch the light on for {num:Number} seconds',
    'to turn lights on for {num:Number} seconds',
    'to turn the light on for {num:Number} seconds'
  ];

  app.intent('SecondsIntent', secUtterances, (slots) => {
    if (!slots.num) {
      return {
        text: 'Nochmals bitte',
        end: false
      };
    } else {
      var baseUrl = 'https://s3.eu-central-1.amazonaws.com/assetsalexa/nachtlicht/';
      var num = slots.num;
      var audio = '';

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

      var ssml = `<speak>${audio}</speak>`;

      return {
        ssml: true,
        text: ssml
      };
    }

  });

};
