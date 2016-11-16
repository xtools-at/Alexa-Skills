const answer = require('./answer');

module.exports = app => {

  const sdUtterances = [
    'wuerfel',
    'wuerfle',
    'wuerfeln',
    'roll',
    'rolle',
    'los',
    'wirf'
  ];

  app.intent('SingleDiceIntent', sdUtterances, () => {
    return answer.create(1, 6);
  });

};
