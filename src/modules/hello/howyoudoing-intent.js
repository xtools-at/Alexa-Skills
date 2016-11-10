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

  // How you doing?
  const howYouDoingUtterances = [
    'Wie gehts',
    'Wie geht es dir',
    'Alles gut',
    'Was geht ab'
  ];

  app.intent('HowYouDoingIntent', howYouDoingUtterances, () => {
    return {
      text: 'Mir geht es wunderbar, danke der Nachfrage',
      end: false
    };
  });

};

