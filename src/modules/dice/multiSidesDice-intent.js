'use strict';
module.exports = app => {

  const msdUtterances = [
    '{num:Number} dice with {sides:Number} sides',
    '{num:Number} die with {sides:Number} sides',
    'roll {num:Number} dice with {sides:Number} sides',
    'roll {num:Number} die with {sides:Number} sides',
    'throw {num:Number} dice with {sides:Number} sides',
    'throw {num:Number} die with {sides:Number} sides',
    'play {num:Number} dice with {sides:Number} sides',
    'play {num:Number} die with {sides:Number} sides'
  ];

  app.intent('MultiSideDiceIntent', msdUtterances, (slots) => {

    if (!slots.num || !slots.sides) {
      return {
        text: 'I did not understand you, please repeat',
        end: false
      };
    } else {
      var dices, sides, min, max;

      dices = slots.num;
      sides = slots.sides;

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
