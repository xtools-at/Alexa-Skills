'use strict';

module.exports = app => {

  // handle mandatory built-in Intents
  const stopUtterances = [
    'stop',
    'halt',
    'ausschalten'
  ];
  const cancelUtterances = [
    'abbrechen',
    'cancel',
    'aufhoeren'
  ];
  const helpUtterances = [
    'hilfe',
    'starte hilfe',
    'hilf mir',
    'was kann ich sagen'
  ];

  app.builtInIntent('stop', stopUtterances, () => '');

  app.builtInIntent('cancel', cancelUtterances, () => '');

  app.builtInIntent('help', helpUtterances, () => {
    var speech = '<speak>';
    speech += 'Um Euro Wechselkurse abzurufen, frage mich zum Beispiel <s>Was ist der Kurs von Schweizer Franken</s>';
    speech += 'Um Waehrungen umzurechnen, frage mich <s>Wieviel sind hundert Dollar in Euro</s>';
    speech += 'Um spezielle Wechselkurse abzurufen, frage mich <s>Was ist der Kurs von Schweizer Franken und Dollar</s>';
    speech += '<s>Womit kann ich dienen</s>';
    speech += '</speak>';

    return {
      ssml: true,
      text: speech,
      end: false
    };
  });
};
