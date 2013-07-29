var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');


var app = express();
//var config = require(path.join(__dirname, '/', 'config.json'));

app.enable("jsonp callback");

app.configure(function(){
  app.set('port', process.env.PORT || 3111);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'assets')));
});


app.configure('development', function(){
  app.use(express.errorHandler());
});

require(path.join(__dirname, 'routes.js'))(app);
require(path.join(__dirname, 'db.js'));
require(path.join(__dirname, 'models', 'index.js'));

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});






