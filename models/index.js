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
exports.Lawdetails = mongoose.model('Lawdetails');
exports.Maxdetails = mongoose.model('Maxdetails');
exports.Unitdetails = mongoose.model('Unitdetails');
exports.Locationdetails = mongoose.model('Locationdetails');
exports.Firsttag = mongoose.model('Firsttag');
exports.Secondtag = mongoose.model('Secondtag');
exports.Alltag = mongoose.model('Alltag');
exports.Noresaultfeedback = mongoose.model('Noresaultfeedback');
exports.Sendlawerrfeedback = mongoose.model('Sendlawerrfeedback');


