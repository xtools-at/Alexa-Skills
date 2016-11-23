'use strict';

const dictionary = require('./dictionary');
const axios = require('axios');

module.exports = app => {

  const exUtterances = [
    'What is the exchange rate for {currencyInput:Currency} and {currencyTarget:Currency}',
    'What is the exchange rate of {currencyInput:Currency} and {currencyTarget:Currency}',
    'What is the exchange rate between {currencyInput:Currency} and {currencyTarget:Currency}',
    'Whats the exchange rate for {currencyInput:Currency} and {currencyTarget:Currency}',
    'Whats the exchange rate of {currencyInput:Currency} and {currencyTarget:Currency}',
    'Whats the exchange rate between {currencyInput:Currency} and {currencyTarget:Currency}',
    'for the exchange rate for {currencyInput:Currency} and {currencyTarget:Currency}',
    'for the exchange rate of {currencyInput:Currency} and {currencyTarget:Currency}',
    'for the exchange rate between {currencyInput:Currency} and {currencyTarget:Currency}',
    'the exchange rate for {currencyInput:Currency} and {currencyTarget:Currency}',
    'the exchange rate of {currencyInput:Currency} and {currencyTarget:Currency}',
    'the exchange rate between {currencyInput:Currency} and {currencyTarget:Currency}',
    'What is the exchange rate for {currencyInput:Currency} to {currencyTarget:Currency}',
    'What is the exchange rate of {currencyInput:Currency} to {currencyTarget:Currency}',
    'What is the exchange rate between {currencyInput:Currency} to {currencyTarget:Currency}',
    'Whats the exchange rate for {currencyInput:Currency} to {currencyTarget:Currency}',
    'Whats the exchange rate of {currencyInput:Currency} to {currencyTarget:Currency}',
    'Whats the exchange rate between {currencyInput:Currency} to {currencyTarget:Currency}',
    'for the exchange rate for {currencyInput:Currency} to {currencyTarget:Currency}',
    'for the exchange rate of {currencyInput:Currency} to {currencyTarget:Currency}',
    'for the exchange rate between {currencyInput:Currency} to {currencyTarget:Currency}',
    'the exchange rate for {currencyInput:Currency} to {currencyTarget:Currency}',
    'the exchange rate of {currencyInput:Currency} to {currencyTarget:Currency}',
    'the exchange rate between {currencyInput:Currency} to {currencyTarget:Currency}',
    'What is the rate for {currencyInput:Currency} and {currencyTarget:Currency}',
    'What is the rate of {currencyInput:Currency} and {currencyTarget:Currency}',
    'What is the rate between {currencyInput:Currency} and {currencyTarget:Currency}',
    'Whats the rate for {currencyInput:Currency} and {currencyTarget:Currency}',
    'Whats the rate of {currencyInput:Currency} and {currencyTarget:Currency}',
    'Whats the rate between {currencyInput:Currency} and {currencyTarget:Currency}',
    'for the rate for {currencyInput:Currency} and {currencyTarget:Currency}',
    'for the rate of {currencyInput:Currency} and {currencyTarget:Currency}',
    'for the rate between {currencyInput:Currency} and {currencyTarget:Currency}',
    'the rate for {currencyInput:Currency} and {currencyTarget:Currency}',
    'the rate of {currencyInput:Currency} and {currencyTarget:Currency}',
    'the rate between {currencyInput:Currency} and {currencyTarget:Currency}',
    'What is the rate for {currencyInput:Currency} to {currencyTarget:Currency}',
    'What is the rate of {currencyInput:Currency} to {currencyTarget:Currency}',
    'What is the rate between {currencyInput:Currency} to {currencyTarget:Currency}',
    'Whats the rate for {currencyInput:Currency} to {currencyTarget:Currency}',
    'Whats the rate of {currencyInput:Currency} to {currencyTarget:Currency}',
    'Whats the rate between {currencyInput:Currency} to {currencyTarget:Currency}',
    'for the rate for {currencyInput:Currency} to {currencyTarget:Currency}',
    'for the rate of {currencyInput:Currency} to {currencyTarget:Currency}',
    'for the rate between {currencyInput:Currency} to {currencyTarget:Currency}',
    'the rate for {currencyInput:Currency} to {currencyTarget:Currency}',
    'the rate of {currencyInput:Currency} to {currencyTarget:Currency}',
    'the rate between {currencyInput:Currency} to {currencyTarget:Currency}'
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
