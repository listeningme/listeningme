'use strict';

var fs = require('fs');
var path = require('path');

console.log('載入所有 controller');
fs.readdirSync(__dirname).forEach(function (filename) {
  if (filename === 'index.js' || !/^[^\.].*\.js$/.test(filename)) {
    return;
  }
  console.log('  -  ' + filename);
  exports[path.basename(filename, '.js')] = require(path.join(__dirname, filename));
});
