var exec = require('child_process').exec;
var util = require('util');

var result = [];

exports.scan = function(interface, cb) {
	var result = [];
	var child = exec('iwlist ' + interface + ' scanning', 
		function(error, stdout, stderr) {

		var wifis = {}
		 , lines = stdout.split('\n')
		 , current = '';

		var lookup = [
			[ 'channel', /Channel ([0-9]+)/]
		  , [ 'frequency', /Frequency:([0-9.]+)/]
		  , [ 'quality',  /Quality=([0-9./]+)/]
		  , [ 'signalLevel', /Signal level=([0-9-]+)/]
		  , [ 'essid', /ESSID:"(\w+)"/]
		  , [ 'encryptionKey', /Encryption key:(on|off)/ ]
		];

		lines.forEach(function(line, index) {
			// Matching the cell
			var match = line.match(/Cell [0-9]+ - Address: ([0-9A-Z:]+)/);
			if (match) {
				current = match[1];
				wifis[current] = {};
			}

			lookup.forEach(function(method, index) {
				match = line.match(method[1]);
				if (match) wifis[current][method[0]] = match[1];
			});
		});
		
		cb(wifis, null);
	});	
};