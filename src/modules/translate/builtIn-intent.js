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
};
