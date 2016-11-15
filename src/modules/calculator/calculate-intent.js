const dictionary = require('./dictionary');
//const axios = require('axios');

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
  app.customSlot('Operation', Object.keys(dictionary.operations));

  //doMath[op1](num1, num2) //== 3;

  const calcUtterances = [
    'Wieviel sind {num1:Number} {op1:Operation} {num2:Number}',
    'Wieviel ist {num1:Number} {op1:Operation} {num2:Number}',
    'Was sind {num1:Number} {op1:Operation} {num2:Number}',
    'Was ist {num1:Number} {op1:Operation} {num2:Number}'
  ];

  app.intent('CalcIntent', calcUtterances, (slots, attr) => {
    if (!slots.num1 || !slots.num2 || !slots.op1) {
      return {
        text: 'Nochmals bitte',
        end: false
      };
    } else {

      if (!slots.num) {
        num = 1;
      } else {
        num = slots.num;
      }
      var inputC = dictionary.currencies[slots.currencyInput];
      var targetC = dictionary.currencies[slots.currencyTarget];

      //return {}

    }
  });
};
