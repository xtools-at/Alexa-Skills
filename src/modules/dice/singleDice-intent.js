'use strict';
module.exports = app => {

  const sdUtterances = [
    'roll',
    'play',
    'dice',
    'die',
    'throw',
    'go',
    'do it'
  ];

  app.intent('SingleDiceIntent', sdUtterances, () => {
    var dices, sides, min, max;

    dices = 1;
    sides = 6;

    min = 1 * dices;
    max = sides * dices;

    var diceValue = Math.floor(Math.random() * (max - min + 1) + min);
    var outputSpeech = `<speak><audio src="https://s3.eu-central-1.amazonaws.com/assetsalexa/wuerfel/dice.mp3" />${diceValue}</speak>`;

    return {
      ssml: true,
      text: outputSpeech
    };
  });

};
