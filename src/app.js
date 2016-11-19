'use strict';

const axios = require('axios');
const moment = require('moment');

/**
 * Main Alexa app entry.
 * Global app configuration and all intent registering belongs here
 */

const alexia = require('alexia');
const app = alexia.createApp('Bitcoin');

/**
 * Register callback to be executed once app is started without any intent.
 * Example invocation: 'Alexa, start <my-app-name>'
 */
app.onStart((slots, attrs, data, done) => {
  var apiKey = JSON.stringify(process.env.QUANDL_API_KEY).replace(/"/g, '');
  var date = moment().subtract(1, 'days').format('YYYY-MM-DD');
  var url = `https://www.quandl.com/api/v3/datasets/BTCE/USDBTC.json?api_key=${apiKey}&start_date=${date}`;

  console.log('debug custom: ', url);

  axios.get(url).then(result => {
    console.log('debug custom: ', result.data);
    if (result.data) {
      // handle errors
      if (!result.data.dataset.data[0] || typeof result.data.dataset.data[0] === 'undefined') {
        done(() => {
          return {
            text: 'Ich konnte die Kurse nicht abrufen'
          };
        });
      }
      // get usd rates as strings
      var high = '' + result.data.dataset.data[0][1].toFixed(3);
      var low = '' + result.data.dataset.data[0][2].toFixed(3);
      var avg = '' + result.data.dataset.data[0][3].toFixed(3);
      var last = '' + result.data.dataset.data[0][4].toFixed(3);
      var buy = '' + result.data.dataset.data[0][5].toFixed(3);
      var sell = '' + result.data.dataset.data[0][6].toFixed(3);

      // replace dots with commas
      high = high.replace('.', ',');
      low = low.replace('.', ',');
      avg = avg.replace('.', ',');
      last = last.replace('.', ',');
      buy = buy.replace('.', ',');
      sell = sell.replace('.', ',');

      // build output speech
      var speech = `<speak>`;
      speech += `<s>Der heutige Durschschnittskurs fuer einen Bitcoin steht bei ${avg} U.S. Dollar, der aktuellste Preis ist ${last}</s>`;
      speech += `<s>Der Kaufpreis steht bei ${buy}, der Verkaufspreis bei ${sell} Dollar</s>`;
      speech += `<s>Der heutige Hoechststand war ${high}, der Tiefststand ${low} Dollar</s>`;
      speech += `</speak>`;

      console.log('debug custom: ', speech);

      done(() => {
        return {
          ssml: true,
          text: speech
        };

      });

    } else {
      done(() => {
        return {
          text: 'Ich konnte die Kurse nicht abrufen'
        };
      });
    }
  });
});

// Register all intents matching specified pattern
app.registerIntents('src/modules/**/*-intent.js');

module.exports = app;
