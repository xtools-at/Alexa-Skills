const answer = require('./answer');

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
      return answer.create(slots.num, slots.sides);
    }

  });
};
