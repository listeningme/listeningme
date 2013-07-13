'use strict';

var path = require('path');
var controllers = require(path.join(__dirname, 'controllers', 'index.js'));
var models = require(path.join(__dirname, 'models', 'index.js'));
var config = require(path.join(__dirname, '/', 'config.json'));

module.exports = function (app) {  
  app.get('/', controllers.home.index);
//  app.get('/addneworg', controllers.low.addNewOrg);
}
