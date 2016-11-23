'use strict';

const dictionary = require('./dictionary');
const axios = require('axios');

module.exports = app => {
  app.customSlot('Currency', Object.keys(dictionary.currencies));

  const convUtterances = [
    'How much is {num:Number} {currencyInput:Currency} in {currencyTarget:Currency}',
    'How much are {num:Number} {currencyInput:Currency} in {currencyTarget:Currency}',
    'convert {num:Number} {currencyInput:Currency} in {currencyTarget:Currency}',
    'convert {num:Number} {currencyInput:Currency} to {currencyTarget:Currency}',
    'to convert {num:Number} {currencyInput:Currency} in {currencyTarget:Currency}',
    'to convert {num:Number} {currencyInput:Currency} to {currencyTarget:Currency}',
    'What is {num:Number} {currencyInput:Currency} in {currencyTarget:Currency}',
    'Whats {num:Number} {currencyInput:Currency} in {currencyTarget:Currency}'
  ];

  app.intent('ConvertIntent', convUtterances, (slots, attrs, data, done) => {
    if (!slots.currencyInput || !slots.currencyTarget) {
      return {
        text: 'I did not recognize one of the currencies',
        end: false
      };
    } else {

      var num;
      if (!slots.num) {
        num = 1;
      } else {
        num = slots.num;
      }
      var inputC = dictionary.currencies[slots.currencyInput];
      var targetC = dictionary.currencies[slots.currencyTarget];

      axios.get(`https://api.fixer.io/latest?base=${inputC}&symbols=${targetC}`).then(result => {
        if (result.data) {
          var rate = result.data.rates[targetC];
          var convertedNumber = num * rate;
          convertedNumber = convertedNumber.toFixed(2);

          var currencyIn = dictionary.currencyNamesPlural[inputC];
          var currencyTarget = dictionary.currencyNamesPlural[targetC];
          var connection = 'is';
          
          if (num === 1) {
            // inputCurrency Singular
            currencyIn = dictionary.currencyNamesSingular[inputC];
          }
          if (convertedNumber === 1 || (Math.round(convertedNumber * 100) / 100) === 1) {
            // targetCurrency Singular
            currencyTarget = dictionary.currencyNamesSingular[targetC];
          }

          // error handling
          if (num !== num || convertedNumber !== convertedNumber || !currencyIn || typeof currencyIn === 'undefined' || !currencyTarget || typeof currencyTarget === 'undefined') {
            done({
              text: 'I did not understand you correctly',
              end: false
            });
          }

          done(`${num} ${currencyIn} ${connection} ${convertedNumber} ${currencyTarget}`);
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
