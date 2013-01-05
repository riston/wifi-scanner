var mongo = require('mongodb-wrapper')
  , c = require('../conf.js')
  , settings = c.db;

var db = mongo.db(settings.host, settings.port, settings.database, '', settings.username, settings.password);

module.exports = db;