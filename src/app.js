/**
 * Main Alexa app entry.
 * Global app configuration and all intent registering belongs here
 */
const alexia = require('alexia');
const app = alexia.createApp('Wuerfel');

/**
 * Register callback to be executed once app is started without any intent.
 * Example invocation: 'Alexa, start <my-app-name>'
 */
app.onStart(() => {
  var dices, sides, min, max;

  dices = 1;
  sides = 6;

  min = 1 * dices;
  max = sides * dices;

  var diceValue = Math.floor(Math.random() * (max - min + 1) + min);
  var outputSpeech = `<speak><audio src="https://s3.eu-central-1.amazonaws.com/assetsalexa/wuerfel/dice.mp3" />${diceValue}</speak>`;

  return {
    ssml: true,
    text: outputSpeech
  };
});

// Register all intents matching specified pattern
app.registerIntents('src/modules/**/*-intent.js');

module.exports = app;
