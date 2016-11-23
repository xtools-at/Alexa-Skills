'use strict';

const dictionary = require('./dictionary');
const axios = require('axios');

module.exports = app => {

  const eurUtterances = [
    'What is the exchange rate for {currencyTarget:Currency}',
    'Whats the exchange rate for {currencyTarget:Currency}',
    'for the exchange rate for {currencyTarget:Currency}',
    'What is the rate for {currencyTarget:Currency}',
    'Whats the rate for {currencyTarget:Currency}',
    'for the rate for {currencyTarget:Currency}',
    'What is the exchange rate of {currencyTarget:Currency}',
    'Whats the exchange rate of {currencyTarget:Currency}',
    'for the exchange rate of {currencyTarget:Currency}',
    'What is the rate of {currencyTarget:Currency}',
    'Whats the rate of {currencyTarget:Currency}',
    'for the rate of {currencyTarget:Currency}',
    'How much is the exchange rate for {currencyTarget:Currency}',
    'How much is the exchange rate of {currencyTarget:Currency}',
    'How much is the rate for {currencyTarget:Currency}',
    'How much is the rate of {currencyTarget:Currency}'
  ];

  app.intent('DomesticRateIntent', eurUtterances, (slots, attrs, data, done) => {
    if (!slots.currencyTarget) {
      return {
        text: 'I did not recognize this currency',
        end: false
      };
    } else {
      var targetC = dictionary.currencies[slots.currencyTarget];

      axios.get(`https://api.fixer.io/latest?base=GBP&symbols=${targetC}`).then(result => {
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

          done(`One Pound Sterling is ${rate} ${currencyTarget}`);
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
