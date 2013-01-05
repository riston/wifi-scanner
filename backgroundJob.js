// Collect the wifi spots statistic on background

var wifi = require('./lib/wifi')
  , SpotsService = require('./service/SpotsService.js');

// Means run every 5 minutes
var repeat = 5 * 30 * 1000;

setInterval(function() {
	wifi.scan('wlan0', function(result, error) {
		if (!error && Object.keys(result).length > 0) {
			SpotsService.save(result, function(err, resultSaved) {
				console.log('Saved the result to database ');
			});
		} else {
			console.log('Problems or empty: ', error, result);
		}
	});
}, repeat);