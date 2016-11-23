'use strict';

const dictionary = require('./dictionary');
const axios = require('axios');

module.exports = app => {

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

  app.intent('DomesticRateIntent', eurUtterances, (slots, attrs, data, done) => {
    if (!slots.currencyTarget) {
      return {
        text: 'I did not recognize this currency',
        end: false
      };
    } else {
      var targetC = dictionary.currencies[slots.currencyTarget];

      axios.get(`https://api.fixer.io/latest?base=EUR&symbols=${targetC}`).then(result => {
        if (result.data) {
          var rate = result.data.rates[targetC];
          rate = rate.toFixed(3);

          var currencyTarget = dictionary.currencyNamesPlural[targetC];

          // error handling
          if (rate !== rate || !currencyTarget || typeof currencyTarget === 'undefined') {
            done({
              text: 'I did not understand you correctly',
              end: false
            });
          }

          // replace dots with commas
          rate = '' + rate.replace('.', ',');

          done(`One Pound Strling is ${rate} ${currencyTarget}`);
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
