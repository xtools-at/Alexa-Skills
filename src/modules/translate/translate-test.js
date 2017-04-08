var Translator = require('./translate-service.js');

Translator.translate('hallo was geht', 'en', function (translatedText) {
  console.log(translatedText);
});

