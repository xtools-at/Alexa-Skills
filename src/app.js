/**
 * Main Alexa app entry.
 * Global app configuration and all intent registering belongs here
 */

const alexia = require('alexia');
const app = alexia.createApp('Nachtlicht');

/**
 * Register callback to be executed once app is started without any intent.
 * Example invocation: 'Alexa, start <my-app-name>'
 */
app.onStart(() => {
	var baseUrl = 'https://s3.eu-central-1.amazonaws.com/assetsalexa/nachtlicht/';

	var audio = `<audio src="${baseUrl + 's01min.mp3'}" />`;
	audio += `<audio src="${baseUrl + 's16s.mp3'}" />`;
	audio += `<audio src="${baseUrl + 's08s.mp3'}" />`;

	var ssml = `<speak>${audio}</speak>`;

	return {
	  ssml: true,
	  text: ssml
	};
});

// Register all intents matching specified pattern
app.registerIntents('src/modules/**/*-intent.js');

module.exports = app;
