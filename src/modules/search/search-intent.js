const dictionary = require('./dictionary');

/**
 * Register SearchIntent
 * Example invocation 1:
 *      - 'Alexa, ask <my-app-name> what is <Item>'
 *
 * Example invocation 2:
 *      - 'Alexa, start <my-app-name>'
 *      - 'What is <item>?'
 */
module.exports = app => {
  app.customSlot('Item', Object.keys(dictionary.items));

  const utterances = [
    'Suche nach {item:Item}',
    'Suche {item:Item}',
    'Was ist {item:Item}',
    'Beschreibe {item:Item}'
  ];

  app.intent('SearchIntent', utterances, (slots, attrs, data, done) => {
    if (!slots.item) {
      done('Das habe ich leider nicht verstanden');
      return;
    }

    dictionary.search(slots.item).then(result => {
      if (result) {
        done(`${slots.item} ist ${result}`);
      } else {
        done(`Ich weiß leider nichts zu ${slots.item}`);
      }
    });
  });
};
