'use strict';

const monitor = require('./monitor-service');

module.exports = app => {

  app.intent('MonitorIntent', (slots, attrs, data, done) => {

    // check if we've got values
    if (!slots.station) {
      return {
        text: app.t('errorStationNotRecognized'),
        end: false
      };
    }

    // build translated dictionary
    const dictionary = app.t('dictionary', {
      returnObjects: true,
      defaultValue: {}
    });

    var stationId = monitor.getStationId(slots.station, dictionary);

    if (typeof stationId !== 'undefined' && stationId && stationId !== '') {

      monitor.startSession(stationId, function (sessionId) {
        if (sessionId !== '') {
          monitor.getDepartures(sessionId, function (departures) {
            if (departures !== '') {

              // build response strings
              var responseString = `<speak>${slots.station}. `;
              var cardString = '';

              // console.log(departures);

              for (var i = 0; i < departures.length; i++) {
                // <s>U1 Richtung Leopoladau: 11:40, 11:50</s>
                var target = departures[i];
                responseString += ('<s>' + app.t('text', {target}));
                cardString += app.t('text', {target});

                for (var ii = 0; ii < target.departures.length; ii++) {

                  responseString += `<say-as interpret-as="time">${target.departures[ii]}</say-as>`;
                  cardString += target.departures[ii];

                  if (ii == target.departures.length - 1) {
                    // last time
                    responseString += '</s> ';
                    cardString += '. ';
                  } else {
                    responseString += ', ';
                    cardString += ', ';
                  }
                }
              }
              responseString += '</speak>';

              done({
                text: responseString,
                end: false,
                card: {
                  title: titleCase(app.t('cardTitle', {slots})),
                  content: cardString
                }
              });

            } else {
              // no departures
              done({
                text: app.t('errorApi'),
                end: false
              });
            }
          });
        } else {
          // no sessionid
          done({
            text: app.t('errorApi'),
            end: false
          });
        }
      });

    } else {
      done({
        text: app.t('errorStationNotRecognized'),
        end: false
      });
    }
  });

  // this coverts lowercase stations back to "Title Case Stations"
  function titleCase (string) {
    var splitStr = string.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  }

};
