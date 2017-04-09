'use strict';

var request = require('request');
var et = require('elementtree');

var getLanguageKey = (lang, dictionary) => {
  try {
    var langLower = lang.toLowerCase();
    return dictionary[langLower];
  } catch (e) {
    console.log(e);
  }
};

var translate = (text, langTo, langFrom, callback) => {

  var translation = '';
  var textEncoded = encodeURIComponent(text);

  var translateUrl = `http://api.microsofttranslator.com/v2/Http.svc/Translate?text=${textEncoded}&to=${langTo}&from=${langFrom}`;
  var clientKey = '[Your MS Text Translator API Key]';

  // get Access Token
  request.post({
        url: 'https://api.cognitive.microsoft.com/sts/v1.0/issueToken',
        headers: {
            'Ocp-Apim-Subscription-Key': clientKey
        }
      },
      // once we get the access token, we call translation API
      function (error, response, body) {
          if (!error && response.statusCode == 200) {

              // get the acces token
              var accessToken = body;
              //console.log(accessToken);

              // connect to the text translate api
              request.get(
                  translateUrl,
                  {
                      'auth' : {
                          'bearer': accessToken
                      }
                  },

                  // 
                  function (error, response, body) {
                      if (!error && response.statusCode == 200) {

                        // body looks like:
                        // <string xmlns="http://schemas.microsoft.com/2003/10/Serialization/">Hello</string>

                        var xmlRes = et.parse(body);
                        translation = xmlRes.findtext('./');

                        return callback(translation);

                      } else {
                        console.log(error);
                        return callback(translation);
                      }
                  }
              );

          } else {
            console.log(error);
            return callback(translation);
          }
      }
  );
};

module.exports = {
  translate,
  getLanguageKey
};
