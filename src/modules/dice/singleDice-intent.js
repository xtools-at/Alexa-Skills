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

    var min, max;
    min = 1;
    max = 6;

    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return {
      text: value
    };
  });

};
