'use strict';

const translator = require('./translate-service');

module.exports = app => {

  app.intent('TranslateIntent', (slots, attrs, data, done) => {

    // check if we've got values
    if (!slots.language || typeof slots.language == 'undefined') {
      done({
        text: app.t('errorLanguageNotRecognized'),
        end: false
      });
    }

    if (!slots.phrase || typeof slots.phrase == 'undefined') {
      done({
        text: app.t('errorPhraseNotRecognized'),
        end: false
      });
    }

    // build translated dictionary
    const dictionary = app.t('dictionary', {
      returnObjects: true,
      defaultValue: {}
    });

    var languageKey = translator.getLanguageKey(slots.language, dictionary);

    if (languageKey && typeof languageKey !== 'undefined') {
      translator.translate(slots.phrase, languageKey, app.t('langFrom'), function (translatedText) {
        // console.log(translatedText);
        if (translatedText !== '') {
          done({
            text: app.t('text', {slots}),
            end: false,
            attrs: {
              'lastPhrase': translatedText
            },
            card: {
              title: app.t('cardTitle'),
              content: app.t('cardContent', {slots, translatedText})
            }
          });
        } else {
          done({
            text: app.t('errorPhraseNotRecognized'),
            end: false
          });
        }
      });
    } else {
      done({
        text: app.t('errorLanguageNotRecognized'),
        end: false
      });
    }
  });

};
