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

    if (stationId !== '') {

      monitor.startSession(stationId, function (sessionId) {
        if (sessionId !== '') {
          monitor.getDepartures(sessionId, function (departures) {
            if (departures !== '') {

              // build response string
              var responseString = '<speak>';
              var cardString = '';

              for (var i = 0; i < departures.length; i++) {
                // <s>U1 Richtung Leopoladau: 11:40, 11:50</s>
                responseString += ('<s>' + app.t('text', {departures}));
                cardString += app.t('text', {departures});

                for (var ii = 0; ii < departures.departures.length; ii++) {
                  responseString += `<say-as interpret-as="time">${departures.departures[ii]}</say-as>`;
                  cardString += departures.departures[ii];

                  if (ii == departures.departures.length - 1) {
                    // last time
                    responseString += '.</s> ';
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
                  title: app.t('cardTitle', {slots}),
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
      return {
        text: app.t('errorStationNotRecognized'),
        end: false
      };
    }
  });

};
