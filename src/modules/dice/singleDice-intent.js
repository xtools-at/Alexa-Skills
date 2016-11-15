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

    return {
      ssml: true,
      text: answer.create(1, 6)
    };
  });

};
