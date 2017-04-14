'use strict';

module.exports = app => {

  app.builtInIntent('help', () => {
    return {
      ssml: true,
      text: app.t('text'),
      end: false
    };
  });
};
