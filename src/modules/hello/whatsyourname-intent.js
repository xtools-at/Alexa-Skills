/**
 * Register HelloIntent
 * Example invocation 1:
 *      - 'Alexa, ask <my-app-name> to say hello'
 *
 * Example invocation 2:
 *      - 'Alexa, start <my-app-name>'
 *      - 'hello'
 */
module.exports = app => {

  // Who are you? / What's your name?
  const whoUtterances = [
    'Wer bist du',
    'Wer bist denn du',
    'Wie heisst du',
    'Wie ist dein Name'
  ];

  app.intent('WhatsYourNameIntent', whoUtterances, () => {
    return {
      text: 'Ich bin Hermann, die Stimme in deinem Kopf',
      end: false
    };
  });

};
