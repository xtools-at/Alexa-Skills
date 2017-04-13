'use strict';

module.exports = app => {

  app.builtInIntent('stop', () => '');

  app.builtInIntent('cancel', () => '');

  app.builtInIntent('no', () => {
    return {
      text: '',
      end: false
    };
  });

  app.builtInIntent('yes', (slots, attrs, data) => {
    console.log(attrs.previousIntent);
    if (attrs.previousIntent == 'TranslateIntent' && attrs.lastPhrase && attrs.lastPhrase !== '') {
      return {
        ssml: true,
        text: app.t('textSpellOut', {attrs}),
        end: false
      };
    } else {
      return {
        text: '',
        end: false
      };
    }
  });
};
