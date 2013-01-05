var db = require('../db/connect.js');
db.collection('spots');

var SpotsService = {
	count: db.spots.count
  , findOne: db.spots.findOne
  , save: function(result, cb) {
	var newResults = [];
	console.log('Raw:', result);
	console.log('Keys: ', Object.keys(result));
	Object.keys(result).forEach(function(address, index) {
		console.log(result[address]);
		result[address]['address'] = address;
		result[address]['created'] = new Date();

		newResults.push(result[address]);
	});
	db.spots.save(newResults, cb);
  }
  , findAllSpots: function(limit, cb) {
	db.spots.find().sort({ created: -1 }).limit(limit).toArray(cb);
  }
  , findAddresses: function(cb) {
	db.spots.distinct('address', {}, cb);
  }
  , getChartAxis: function(address, cb) {
  	var select = {
  		signalLevel: 1, created: 1, quality: 1
  	};

  	db.spots.find({ address: address }, select).limit(50).toArray(function(err, data) {
  		if (!err) {
  			var result = {}
  			  , xAxisDate = []
  			  , yAxisSignal = []

  			data.forEach(function(row, index) {
  				xAxisDate.push(new Date(row['created']).getTime());
  				yAxisSignal.push(parseInt(row['signalLevel'], 10));
  			});
  			result['xAxisDate'] = xAxisDate;
  			result['yAxisSignal'] = yAxisSignal;

  			return cb(null, result);
  		}
  		return cb(err);
  	});
  }
  , getInfo: function(cb) {
  	db.spots.distinct('frequency', function(errF, freqs) {
  		db.spots.distinct('channel', function(errC, channels) {
  			if (!errF && !errC) {
  				return cb(null, { 
  					'frequencies': freqs
  				  , 'channels': channels 
  				});
  			} else {
  				return cb(new Error('On getting info'));
  			}
  		});
  	});
  }
};

module.exports = SpotsService;