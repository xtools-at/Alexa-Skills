var x = require('../src/modules/tube/monitor-service.js');

x.startSession('60200657', function (response) {
  console.log('R1:'+response);
  x.getDepartures(response, function (response2) {
    console.log('R2:'+response2);
  });
});
