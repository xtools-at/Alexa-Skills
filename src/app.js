'use strict';

/**
 * Main Alexa app entry.
 * Global app configuration and all intent registering belongs here
 */

const alexia = require('alexia');
const app = alexia.createApp('Bitcoin');

/**
 * Register callback to be executed once app is started without any intent.
 * Example invocation: 'Alexa, start <my-app-name>'
 */
app.onStart(() => {
  return {
    //text: 'Frage mich nach dem Bitcoin Kurs, wieviel einer Waehrung in Bitcoin ausmacht oder anders herum'
  };
});

// Register all intents matching specified pattern
app.registerIntents('src/modules/**/*-intent.js');

module.exports = app;
