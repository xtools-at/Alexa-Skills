'use strict';
module.exports = app => {

  const msdUtterances = [
    'wuerfel mit {num:Number} Wuerfeln mit {sides:Number} Seiten',
    'wuerfel {num:Number} Wuerfel mit {sides:Number} Seiten',
    'wuerfle mit {num:Number} Wuerfeln mit {sides:Number} Seiten',
    'wuerfle {num:Number} Wuerfel mit {sides:Number} Seiten',
    'rolle mit {num:Number} Wuerfeln mit {sides:Number} Seiten',
    'rolle {num:Number} Wuerfel mit {sides:Number} Seiten',
    'roll {num:Number} Wuerfel mit {sides:Number} Seiten',
    'wirf mit {num:Number} Wuerfeln mit {sides:Number} Seiten',
    'wirf {num:Number} Wuerfel mit {sides:Number} Seiten',
    '{num:Number} Wuerfel mit {sides:Number} Seiten'
  ];

  app.intent('MultiSideDiceIntent', msdUtterances, (slots) => {

    if (!slots.num || !slots.sides) {
      return {
        text: 'Nochmals bitte',
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
        outputSpeech = `<speak>Da ist was schiefgelaufen</speak>`;
      }

      return {
        ssml: true,
        text: outputSpeech
      };
    }

  });
};
