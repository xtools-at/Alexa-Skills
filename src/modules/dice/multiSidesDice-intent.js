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

  app.intent('MultiSideDiceIntent', msdUtterances, () => {

    if {!slots.num || !slots.sides} {
      return {
        text: 'Nochmals bitte',
        end: false
      };
    } else {
      var min, max;
      min = 1 * num;
      max = sides * num;

      var value = Math.floor(Math.random() * (max - min + 1) + min);

      return {
        text: value
      };
    }

  });
};
