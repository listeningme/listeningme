
'use strict';

var crypto = require('crypto');

exports.encrypt = function encrypt(str, secret) {
  var cipher = crypto.createCipher('aes192', secret);
  var enc = cipher.update(str, 'utf8', 'hex');
  enc += cipher.final('hex');
  return enc;
};

exports.decrypt = function decrypt(str, secret) {
  var decipher = crypto.createDecipher('aes192', secret);
  var dec = decipher.update(str, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
};

exports.randomString = function randomString(str, len) {
  if (typeof str === 'number') {
    len = str;
    str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890~@#$%^&*()_+{}[]|<>?';
  }
  if (len) {
    len = 10;
  }
  var re = '';
  var strlen = str.length - 1;
  while (len) {
    re += str[Math.round(Math.random() * strlen)];
    len -= 1;
  }
  return re;
};

exports.metaOg = function metaOg(json) {
  if (!json) {
    return '';
  }
  var html = '';
  var i;
  for (i in json) {
    if (json.hasOwnProperty(i)) {
      html += '<meta property="og:' + i + '" content="' + json[i] + '"/>';
    }
  }
  return html;
};

exports.gavatar = function gavatar(email, size) {
  var md5sum = crypto.createHash('md5');
  md5sum.update(email);
  return 'http://www.gravatar.com/avatar/' + md5sum.digest('hex') + '?s=' + (size || 120);
};

exports.checkError = function (errFn, fn) {
  return function (err) {
    if (err) {
      return errFn(err);
    }
    fn.apply(null, arguments);
  };
};
