var SpotsService = require('./service/SpotsService.js');

var printCount = function(err, count) {
	console.log('There are already ' + count);
};

SpotsService.count(printCount);

/*var db = require('./db.js');

db.collection('spots');


db.spots.save({ name: 'Test' }, function(err, post) {
	if (!err) console.log('Success');
});

var printCount = function(err, count) {
	console.log('There are already ' + count);
};

db.spots.count(printCount);
*/
var wifi = require('./lib/wifi');

wifi.scan('wlan0', function(result, error) {
	console.log(result, error);
});


SpotsService.getChartAxis('00:14:7F:22:B8:15', function(err, data) {
	console.log(data);
});