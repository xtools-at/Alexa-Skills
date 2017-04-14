'use strict';

const dictionary = require('./dictionary');
const axios = require('axios');
var libxmljs = require('libxmljs');

var availableLines = ['U1', 'U2', 'U3', 'U4', 'U6'];

module.exports = app => {
  app.customSlot('Station', Object.keys(dictionary.stations));

  const monitorUtterances = [
    'nach {station:Station}',
    'nach Abfahrtszeiten von {station:Station}',
    'wegen {station:Station}',
    'wegen Abfahrtszeiten von {station:Station}'
  ];

  app.intent('MonitorIntent', monitorUtterances, (slots, attrs, data, done) => {
    if (!slots.station) {
      return {
        text: 'Diese Station habe ich leider nicht erkannt',
        end: false
      };
    } else {

      // TODO START
      var stationId = dictionary.stations[slots.station];

      var url = `http://www.wienerlinien.at/ogd_routing/XML_DM_REQUEST?sessionID=0&locationServerActive=1&type_dm=stop&limit=10&name_dm=${stationId}`;

      axios.get(url).then(result => {
        if (result.data) {

          var resultString = '<?xml version="1.0" encoding="UTF-8"?>' + result.data;
          /*
          var xml =  '<?xml version="1.0" encoding="UTF-8"?>' +
                     '<root>' +
                         '<child foo="bar">' +
                             '<grandchild baz="fizbuzz">grandchild content</grandchild>' +
                         '</child>' +
                         '<sibling>with content!</sibling>' +
                     '</root>';

          var xmlDoc = libxmljs.parseXml(xml);

          // xpath queries
          var gchild = xmlDoc.get('//grandchild');

          console.log(gchild.text());  // prints "grandchild content"

          var children = xmlDoc.root().childNodes();
          var child = children[0];

          console.log(child.attr('foo').value()); // prints "bar"
          */
          console.log(resultString);

          var xmlRes = libxmljs.parseXml(resultString);
          var sessionId = xmlRes.root().attr('sessionID').value();
          console.log(sessionId);

          var secondCall = `http://www.wienerlinien.at/ogd_routing/XML_DM_REQUEST?requestID=1&dmLineSelectionAll=1&sessionID=${sessionId}`;

          axios.get(secondCall).then(result => {
            if (result.data) {

              var resultString = '<?xml version="1.0" encoding="UTF-8"?>' + result.data;
              var xmlRes = libxmljs.parseXml(resultString);

              var departuresArray = xmlRes.get('//itdDepartureList').childNodes();

              var obj = {};

              for (var i = 0; i < departuresArray.length; i++) {
                // get time
                var timeTag = departuresArray[i].get('//itdTime');
                var h = timeTag.attr('hour');
                var m = timeTag.attr('minute');
                var time = `${h}:${m}`;

                // get line
                var lineTag = departuresArray[i].get('//itdServingLine');
                var line = lineTag.attr('symbol');
                var direction = lineTag.attr('direction');

                // check if line is valid
                if (availableLines.indexOf(line) !== -1) {

                  if (typeof obj[line] === 'undefined') {
                    // key value is undefined
                    // set it up
                    obj[line] = {};
                    obj[line]['name'] = line;
                    obj[line]['direction'] = [];
                    obj[line]['direction']['name'] = 

                  }
                  obj[line].push(line);
                }
                }

              }

              // error handling
              if (typeof res === 'undefined') {
                done({
                  text: 'Ich habe dich nicht richtig verstanden',
                  end: false
                });
              }

              // replace dots with commas
              //rate = '' + rate.replace('.', ',');

              done(`Ein Euro sind ${rate} ${currencyTarget}`);

              // TODO END

            } else {
              done({
                text: 'Entschuldige, ich konnte gerade keine Daten von Wiener Linien abrufen. Bitte versuche es nochmals.',
                end: false
              });
            }
          });

        } else {
          done({
            text: 'Entschuldige, ich konnte gerade keine Daten von Wiener Linien abrufen. Bitte versuche es nochmals.',
            end: false
          });
        }
      });

    }
  });
};
