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
    speech += 'Rolle einen oder mehrere Wurefel mit <s>los</s> oder <s>Wirf zwei Wuerfel</s>';
    speech += 'Verwende Wurfel mit eigener Seitenzahl mit <s>Rolle drei Wuerfel mit zwanzig Seiten</s>';
    speech += '<s>Womit kann ich dienen</s>';
    speech += '</speak>';

    return {
      ssml: true,
      text: speech,
      end: false
    };
  });
};
