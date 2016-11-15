/**
 * Register HelloIntent
 * Example invocation 1:
 *      - 'Alexa, ask <my-app-name> to say hello'
 *
 * Example invocation 2:
 *      - 'Alexa, start <my-app-name>'
 *      - 'hello'
 */
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

    if {!slots.num} {
      return {
        text: 'Nochmals bitte',
        end: false
      };
    } else {
      var min, max;
      min = 1 * num;
      max = 6 * num;

      var value = Math.floor(Math.random() * (max - min + 1) + min);

      return {
        text: value
      };

    }
  });

};
