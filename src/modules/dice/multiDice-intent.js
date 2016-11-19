'use strict';
module.exports = app => {

  const mdUtterances = [
    'wuerfel mit {num:Number} Wuerfeln',
    'wuerfel {num:Number} Wuerfel',
    'wuerfle mit {num:Number} Wuerfeln',
    'wuerfle {num:Number} Wuerfel',
    'rolle mit {num:Number} Wuerfeln',
    'rolle {num:Number} Wuerfel',
    'roll {num:Number} Wuerfel',
    'wirf mit {num:Number} Wuerfeln',
    'wirf {num:Number} Wuerfel',
    '{num:Number} Wuerfel'
  ];

  app.intent('MultiDiceIntent', mdUtterances, (slots) => {

    if (!slots.num) {
      return {
        text: 'Nochmals bitte',
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
        outputSpeech = `<speak>Da ist was schiefgelaufen</speak>`;
      }

      return {
        ssml: true,
        text: outputSpeech
      };
    }
  });

};
