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
  app.customSlot('Currency', Object.keys(dictionary.currencies));

  const convUtterances = [
    'Wieviel sind {num:Number} {currencyInput:Currency} in {currencyTarget:Currency}',
    'Wieviel ist {num:Number} {currencyInput:Currency} in {currencyTarget:Currency}',
    'Wieviel {currencyTarget:Currency} sind {num:Number} {currencyInput:Currency}',
    'Wieviel {currencyTarget:Currency} ist {num:Number} {currencyInput:Currency}',
    'Was sind {num:Number} {currencyInput:Currency} in {currencyTarget:Currency}',
    'Was ist {num:Number} {currencyInput:Currency} in {currencyTarget:Currency}'
  ];

  app.intent('ConvertIntent', convUtterances, (slots, attrs, data, done) => {
    if (!slots.currencyInput || !slots.currencyTarget) {
      return {
        text: 'Eine der Waehrungen kenne ich nicht',
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
          var connection = 'sind';
          if (num === 1) {
            // inputCurrency Singular
            currencyIn = dictionary.currencyNamesSingular[inputC];
          }
          if (convertedNumber === 1 || (Math.round(convertedNumber * 100) / 100) === 1) {
            // targetCurrency Singular
            currencyTarget = dictionary.currencyNamesSingular[targetC];
            connection = 'ist';
          }

          // error handling
          if (num !== num || convertedNumber !== convertedNumber || !currencyIn || typeof currencyIn === 'undefined' || !currencyTarget || typeof currencyTarget === 'undefined') {
            done({
              text: 'Ich habe dich nicht richtig verstanden',
              end: false
            });
          }

          // replace dots with commas
          num = '' + num.replace('.', ',');
          convertedNumber = '' + convertedNumber.replace('.', ',');

          done(`${num} ${currencyIn} ${connection} ${convertedNumber} ${currencyTarget}`);
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
