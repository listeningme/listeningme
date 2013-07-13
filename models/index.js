'use strict';

var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

console.log('載入所有 model');
fs.readdirSync(__dirname).forEach(function (filename) {
  if (filename === 'index.js' || !/^[^\.].*\.js$/.test(filename)) {
    return;
  }
  console.log('  -  ' + filename);
  require(path.join(__dirname, filename));
});

exports.User = mongoose.model('User');
