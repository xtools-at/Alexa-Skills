const dictionary = require('./dictionary');
const axios = require('axios');

/**
 * Register SearchIntent
 * Example invocation 1:
 *      - 'Alexa, ask <my-app-name> what is <Item>'
 *
 * Example invocation 2:
 *      - 'Alexa, start <my-app-name>'
 *      - 'What is <item>?'
 */
module.exports = app => {

  const exUtterances = [
    'Was ist der Kurs von {currencyInput:Currency} auf {currencyTarget:Currency}',
    'Was ist der Kurs von {currencyInput:Currency} und {currencyTarget:Currency}',
    'Was ist der Kurs fuer {currencyInput:Currency} auf {currencyTarget:Currency}',
    'Was ist der Kurs fuer {currencyInput:Currency} und {currencyTarget:Currency}',
    'Was ist der Kurs zwischen {currencyInput:Currency} auf {currencyTarget:Currency}',
    'Was ist der Kurs zwischen {currencyInput:Currency} und {currencyTarget:Currency}',
    'Was ist der Wechselkurs von {currencyInput:Currency} auf {currencyTarget:Currency}',
    'Was ist der Wechselkurs von {currencyInput:Currency} und {currencyTarget:Currency}',
    'Was ist der Wechselkurs fuer {currencyInput:Currency} auf {currencyTarget:Currency}',
    'Was ist der Wechselkurs fuer {currencyInput:Currency} und {currencyTarget:Currency}',
    'Was ist der Wechselkurs zwischen {currencyInput:Currency} auf {currencyTarget:Currency}',
    'Was ist der Wechselkurs zwischen {currencyInput:Currency} und {currencyTarget:Currency}',
    'Wieviel ist der Kurs von {currencyInput:Currency} auf {currencyTarget:Currency}',
    'Wieviel ist der Kurs von {currencyInput:Currency} und {currencyTarget:Currency}',
    'Wieviel ist der Kurs fuer {currencyInput:Currency} auf {currencyTarget:Currency}',
    'Wieviel ist der Kurs fuer {currencyInput:Currency} und {currencyTarget:Currency}',
    'Wieviel ist der Kurs zwischen {currencyInput:Currency} auf {currencyTarget:Currency}',
    'Wieviel ist der Kurs zwischen {currencyInput:Currency} und {currencyTarget:Currency}',
    'Wieviel ist der Wechselkurs von {currencyInput:Currency} auf {currencyTarget:Currency}',
    'Wieviel ist der Wechselkurs von {currencyInput:Currency} und {currencyTarget:Currency}',
    'Wieviel ist der Wechselkurs fuer {currencyInput:Currency} auf {currencyTarget:Currency}',
    'Wieviel ist der Wechselkurs fuer {currencyInput:Currency} und {currencyTarget:Currency}',
    'Wieviel ist der Wechselkurs zwischen {currencyInput:Currency} auf {currencyTarget:Currency}',
    'Wieviel ist der Wechselkurs zwischen {currencyInput:Currency} und {currencyTarget:Currency}',
    'nach dem Kurs von {currencyInput:Currency} auf {currencyTarget:Currency}',
    'nach dem Kurs von {currencyInput:Currency} und {currencyTarget:Currency}',
    'nach dem Kurs fuer {currencyInput:Currency} auf {currencyTarget:Currency}',
    'nach dem Kurs fuer {currencyInput:Currency} und {currencyTarget:Currency}',
    'nach dem Kurs zwischen {currencyInput:Currency} auf {currencyTarget:Currency}',
    'nach dem Kurs zwischen {currencyInput:Currency} und {currencyTarget:Currency}',
    'nach dem Wechselkurs von {currencyInput:Currency} auf {currencyTarget:Currency}',
    'nach dem Wechselkurs von {currencyInput:Currency} und {currencyTarget:Currency}',
    'nach dem Wechselkurs fuer {currencyInput:Currency} auf {currencyTarget:Currency}',
    'nach dem Wechselkurs fuer {currencyInput:Currency} und {currencyTarget:Currency}',
    'nach dem Wechselkurs zwischen {currencyInput:Currency} auf {currencyTarget:Currency}',
    'nach dem Wechselkurs zwischen {currencyInput:Currency} und {currencyTarget:Currency}'
  ];

  app.intent('ExchangeRateIntent', exUtterances, (slots, attrs, data, done) => {
    if (!slots.currencyInput || !slots.currencyTarget) {
      return {
        text: 'Eine der Waehrungen kenne ich nicht',
        end: false
      };
    } else {

      var inputC = dictionary.currencies[slots.currencyInput];
      var targetC = dictionary.currencies[slots.currencyTarget];

      axios.get(`https://api.fixer.io/latest?base=${inputC}&symbols=${targetC}`).then(result => {
        if (result.data) {
          var rate = result.data.rates[targetC];
          rate = rate.toFixed(3);

          var currencyIn = dictionary.currencyNamesSingular[inputC];
          var currencyTarget = dictionary.currencyNamesPlural[targetC];

          done(`Ein ${currencyIn} sind ${rate} ${currencyTarget}`);
        } else {
          done({
            text: 'Entschuldige, da hat was nicht geklappt',
            end: false
          });
        }
      });

    }
  });
};
