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
  // app.customSlot('Currency', Object.keys(dictionary.currencies));

  const eurUtterances = [
    'Was ist der Kurs von {currencyTarget:Currency}',
    'Was ist der Kurs fuer {currencyTarget:Currency}',
    'Was ist der Kurs auf {currencyTarget:Currency}',
    'Was ist der Wechselkurs von {currencyTarget:Currency}',
    'Was ist der Wechselkurs fuer {currencyTarget:Currency}',
    'Was ist der Wechselkurs auf {currencyTarget:Currency}',
    'Wieviel ist der Kurs von {currencyTarget:Currency}',
    'Wieviel ist der Kurs fuer {currencyTarget:Currency}',
    'Wieviel ist der Kurs auf {currencyTarget:Currency}',
    'Wieviel ist der Wechselkurs von {currencyTarget:Currency}',
    'Wieviel ist der Wechselkurs fuer {currencyTarget:Currency}',
    'Wieviel ist der Wechselkurs auf {currencyTarget:Currency}',
    'Wie ist der Kurs von {currencyTarget:Currency}',
    'Wie ist der Kurs fuer {currencyTarget:Currency}',
    'Wie ist der Kurs auf {currencyTarget:Currency}',
    'Wie ist der Wechselkurs von {currencyTarget:Currency}',
    'Wie ist der Wechselkurs fuer {currencyTarget:Currency}',
    'Wie ist der Wechselkurs auf {currencyTarget:Currency}',
    'nach dem Kurs von {currencyTarget:Currency}',
    'nach dem Kurs fuer {currencyTarget:Currency}',
    'nach dem Kurs auf {currencyTarget:Currency}',
    'nach dem Wechselkurs von {currencyTarget:Currency}',
    'nach dem Wechselkurs fuer {currencyTarget:Currency}',
    'nach dem Wechselkurs auf {currencyTarget:Currency}'
  ];

  app.intent('EuroRateIntent', eurUtterances, (slots, attrs, data, done) => {
    if (!slots.currencyTarget) {
      done('Diese Waehrung kenne ich nicht');
      return;
    } else {
      var targetC = dictionary.currencies[slots.currencyTarget];

      axios.get(`https://api.fixer.io/latest?base=EUR&symbols=${targetC}`).then(result => {
        if (result.data) {
          var rate = result.data.rates[targetC];
          rate = rate.toFixed(3);

          var currencyTarget = dictionary.currencyNamesPlural[targetC];

          done(`Ein Euro sind ${rate} ${currencyTarget}`);
        } else {
          done('Entschuldige, da hat was nicht geklappt');
        }
      });

    }
  });
};
