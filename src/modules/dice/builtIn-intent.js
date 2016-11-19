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
    speech += 'Roll one or more dice with <s>go</s> oder <s>roll two dice</s>';
    speech += 'Use dice with any number of sides with <s>roll two dice with twenty sides</s>';
    speech += '<s>What can I do for you</s>';
    speech += '</speak>';

    return {
      ssml: true,
      text: speech,
      end: false
    };
  });
};
