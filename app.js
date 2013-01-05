
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , SpotsService = require('./service/SpotsService.js')
  , c = require('./conf.js');

var app = express();

var addressList = function(req, res, next) {
  console.log('Get adderss list');
  SpotsService.findAddresses(function(error, addresses) {
    if (error) {
      next(error);
    } else 
      req.addresses = addresses;
      next();
  });
};

app.configure(function(){
  app.set('port', c.web.port);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(addressList);
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.param('address', function(req, res, next, address) {
  console.log('Getting spot object');
  SpotsService.findOne({ address: address }, function(err, spot) {
    if (err) {
      next(err);
    } else if (spot) {
      req.spot = spot;
      next();
    } else {
      next(new Error('Failed to load the wifi-spot'));
    }
  });
});

app.get('/', function(req, res) {
  SpotsService.getInfo(function(err, info) {
      res.render('index', { 
          title: 'Intro'
        , channels: info.channels
        , frequencies: info.frequencies
        , addresses: req.addresses
      });    
    });
});

app.get('/address/:address', function(req, res) {
  res.render('spot', {
      title: 'Wifi spot'
    , spot: req.spot
    , addresses: req.addresses
  });
});

app.get('/address/chart/:address', function(req, res) {
  SpotsService.getChartAxis(req.params.address, function(err, data) {
    res.json(data);
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
