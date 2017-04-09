var Translator = require('../src/modules/translate/translate-service.js');

Translator.translate('hallo was geht', 'en', 'de', function (translatedText) {
  console.log(translatedText);
});

