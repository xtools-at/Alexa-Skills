'use strict';

const dictionary = require('./dictionary');
const axios = require('axios');

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
        text: 'I did not recognize one of the currencies',
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

          // error handling
          if (rate !== rate || !currencyIn || typeof currencyIn === 'undefined' || !currencyTarget || typeof currencyTarget === 'undefined') {
            done({
              text: 'I did not understand you correctly',
              end: false
            });
          }

          done(`One ${currencyIn} is ${rate} ${currencyTarget}`);
        } else {
          done({
            text: 'Something went wrong, please try again',
            end: false
          });
        }
      });

    }
  });
};
