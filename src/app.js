/**
 * Main Alexa app entry.
 * Global app configuration and all intent registering belongs here
 */

const alexia = require('alexia');
const app = alexia.createApp('Wechselstube');

/**
 * Register callback to be executed once app is started without any intent.
 * Example invocation: 'Alexa, start <my-app-name>'
 */
app.onStart(() => {
	return {
		text: 'Frage mich nach Wechselkursen oder wieviel einer Waehrung in einer anderen ausmacht',
		end: false
	};
});


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
  speech += '<s>Was darf es sein</s>';
  speech += '</speak>';

  return {
    ssml: true,
    text: speech,
    end: false
  };
});


// Register all intents matching specified pattern
app.registerIntents('src/modules/**/*-intent.js');

module.exports = app;
