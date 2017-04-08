'use strict';

module.exports = app => {

  app.builtInIntent('yes', () => {
    return {
      ssml: true,
      text: app.t('text'),
      end: false
    };
  });

  app.builtInIntent('no', () => {
    return {
      text: '',
      end: false
    };
  });
};
