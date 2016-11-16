const answer = require('./answer');

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
      return answer.create(slots.num, 6);
    }
  });

};
