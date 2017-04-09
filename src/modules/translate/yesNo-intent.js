'use strict';

module.exports = app => {

  app.builtInIntent('yes', (slots, attrs, data) => {
    console.log(attrs.previousIntent);
    if (attrs.previousIntent == 'TranslateIntent' && typeof attrs.lastPhrase !== undefined && attrs.lastPhrase !== '') {
      return {
        ssml: true,
        text: app.t('textSpellOut', attrs),
        end: false
      };
    } else {
      return {
        text: '',
        end: false
      };
    }
  });

  app.builtInIntent('no', () => {
    return {
      text: '',
      end: false
    };
  });
};
