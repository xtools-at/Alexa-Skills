const axios = require('axios');
const moment = require('moment');

const answer = {
  'create': () => {
    var apiKey = '';
    var date = moment().subtract(1, 'days').format('YYYY-MM-DD');
    axios.get(`https://www.quandl.com/api/v3/datasets/BTCE/USDBTC.json?api_key=${apiKey}&start_date=${date}`).then(result => {
      if (result.data) {
        //get the avg usd rate for 1 bc
        var rate = result.data.dataset.data[0][3];

        axios.get(`https://api.fixer.io/latest?base=EUR&symbols=${targetC}`).then(result => {
          if (result.data) {
            

            done(`Ein Euro sind ${rate} ${currencyTarget}`);
          } else {
            done({
              text: 'Entschuldige, da hat was nicht geklappt',
              end: false
            });
          }
        });

      }
    });
  }
};

module.exports = {
  answer
};
