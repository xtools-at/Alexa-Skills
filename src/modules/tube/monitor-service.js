'use strict';

const axios = require('axios');
var et = require('elementtree');

var availableLines = ['U1', 'U2', 'U3', 'U4', 'U6'];

var getStationId = (station, dictionary) => {
  try {
    return dictionary[station.toLowerCase()];
  } catch (e) {
    console.log(e);
  }
};

var startSession = (stationId, callback) => {

  var urlStartSession = `http://www.wienerlinien.at/ogd_routing/XML_DM_REQUEST?sessionID=0&locationServerActive=1&type_dm=stop&limit=10&name_dm=${stationId}`;

  axios.get(urlStartSession).then(result => {
    if (result.data && result.status == 200) {

      var xmlRes = et.parse(result.data);
      var sessionId = xmlRes.find('./').get('sessionID');

      console.log(sessionId);

      if (!sessionId || typeof sessionId == 'undefined' || sessionId == '') {
        // no sessionId
        console.log('No sessionId found');
        return callback('');
      }
      return callback(sessionId);

    } else {
      // call 1 failed
      console.log('startSession failed');
      return callback('');
    }

  });
};

var getDepartures = (sessionId, callback) => {

  var urlGetDepartures = `http://www.wienerlinien.at/ogd_routing/XML_DM_REQUEST?requestID=1&dmLineSelectionAll=1&sessionID=${sessionId}`;

  axios.get(urlGetDepartures).then(result => {
    if (result.data && result.status == 200) {

      var xmlRes = et.parse(result.data);
      var departuresArray = xmlRes.find('*/itdDepartureList').findall('./itdDeparture');

      // build lines and directions list

      var directionsArray = [];
      var resultArray = [];
      /* Ex:
      [{
        line: U1,
        direction: Leopoldau,
        departures: [11:10, 11:12, 11:14]
        },...
      ]
      */

      for (var i = 0; i < departuresArray.length; i++) {

        var lineTag = departuresArray[i].find('./itdServingLine');
        var timeTag = departuresArray[i].find('./itdDateTime/itdTime');

        // get lines
        var line = lineTag.get('symbol');
        if (line && availableLines.indexOf(line) !== -1) {

          // it's valid, let's go!

          // get direction
          var direction = lineTag.get('direction');
          if (direction) {
            var directionIndex = directionsArray.indexOf(direction);

            if (directionIndex == -1) {
              // new direction found
              directionsArray.push(direction);
              directionIndex = directionsArray.indexOf(direction);

              // set up object skeleton
              resultArray[directionIndex] = {};
              resultArray[directionIndex]['line'] = line;
              resultArray[directionIndex]['direction'] = direction.replace('Wien ', '');
              resultArray[directionIndex]['departures'] = [];
            }

            // add departure time
            var h = timeTag.get('hour');
            var m = timeTag.get('minute');
            var time = `${h}:${m}`;

            resultArray[directionIndex]['departures'].push(time);
          }
        }

      }

      // sort by line
      resultArray = resultArray.sort(sortObjectsByLine);
      //console.log(resultArray);

      return callback(resultArray);

    } else {
      // call 2 failed
      console.log('getDepartures failed');
      return callback('');
    }

  });
};

function sortObjectsByLine (a, b) {
  if (a.line < b.line) {
    return -1;
  } else if (a.line > b.line) {
    return 1;
  } else {
    return 0;
  }
}

module.exports = {
  getStationId,
  startSession,
  getDepartures
};
