'use strict';

module.exports = app => {

  // handle mandatory built-in Intents
  const stopUtterances = [
    'stop',
    'stop now',
    'please stop',
    'halt',
    'turn off'
  ];
  const cancelUtterances = [
    'abort',
    'cancel',
    'dont'
  ];
  const helpUtterances = [
    'help',
    'help me',
    'start help'
  ];

  app.builtInIntent('stop', stopUtterances, () => '');

  app.builtInIntent('cancel', cancelUtterances, () => '');

  app.builtInIntent('help', helpUtterances, () => {
    var speech = '<speak>';
    speech += 'To retrieve exchange rates for U.S. Dollar, ask me for example <s>Whats the exchange rate for the Swiss Franc</s>';
    speech += 'To convert currencies, ask me <s>How much is 100 Dollar in Euro</s>';
    sppech += 'To retrieve specific exchange rates, ask me <s>Whats the exchange rate between Swiss Franc and Euro</s>';
    speech += '<s>How can I help you</s>';
    speech += '</speak>';

    return {
      ssml: true,
      text: speech,
      end: false
    };
  });
};
