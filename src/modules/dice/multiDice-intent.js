'use strict';
module.exports = app => {

  const mdUtterances = [
    '{num:Number} dice',
    '{num:Number} die',
    'roll {num:Number} dice',
    'roll {num:Number} die',
    'throw {num:Number} dice',
    'throw {num:Number} die',
    'play {num:Number} dice',
    'play {num:Number} die'
  ];

  app.intent('MultiDiceIntent', mdUtterances, (slots) => {

    if (!slots.num) {
      return {
        text: 'I did not understand you, please repeat',
        end: false
      };
    } else {
      var dices, sides, min, max;

      dices = slots.num;
      sides = 6;

      min = 1 * dices;
      max = sides * dices;

      var diceValue = Math.floor(Math.random() * (max - min + 1) + min);
      var outputSpeech = `<speak><audio src="https://s3.eu-central-1.amazonaws.com/assetsalexa/wuerfel/dice.mp3" />${diceValue}</speak>`;

      // check for NaN
      if (diceValue !== diceValue) {
        outputSpeech = `<speak>I did not understand you</speak>`;
      }

      return {
        ssml: true,
        text: outputSpeech
      };
    }
  });

};
